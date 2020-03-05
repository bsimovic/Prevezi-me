<?php
require_once 'IRadSaBazom.php';
require_once 'Korisnik.php';
require_once 'Voznja.php';
require_once 'KonstanteZaBazu.php';

class BazaPodatakaService implements IRadSaBazom
{   
    //ovo je korektno, tj sa novim argumentima
    public function azurirajKorisnika($stariUsername, $noveGodineIskustva, $novaLozinka, $novEmail, $noviBrojTelefona) 
    {
        $konekcijaKaBazi = KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        //neke stvari ne mogu da se menjaju...
        $nizKolonaUTabeli = array("godine_iskustva", "lozinka", "email", "broj_telefona");
        $nizNovihPodatakaZaTabelu = array($noveGodineIskustva, $novaLozinka, $novEmail, $noviBrojTelefona);
        $sadrzajUpita = KonstanteZaBazu::vratiUpitZaAzuriranjeTabele('korisnik', $nizKolonaUTabeli, $nizNovihPodatakaZaTabelu, "username", $stariUsername);//malo moram da modifikujem
    
        if(!$konekcijaKaBazi->query($sadrzajUpita))
        {
            $greska = $konekcijaKaBazi->error;
            print "<p>".$greska."</p>";
        }
        $konekcijaKaBazi->close();
    }

    public function dodajNovogKorisnika($ime, $prezime, $godinaRodjenja, $godineIskustva, $pol, $lozinka, $email, $brojTelefona, $username, $rating, $admin)
    {
        $nizKolonaUTabeli = array("ime", "prezime", "godina_rodjenja", "godine_iskustva", "pol", "lozinka", "email", "broj_telefona", "username", "rating", "admin");
        $nizVrednosti = array("$ime", "$prezime", $godinaRodjenja, $godineIskustva, "$pol", "$lozinka", "$email", $brojTelefona, "$username", $rating, $admin);
        $konekcijaKaBazi = KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        $sadrzajUpita = KonstanteZaBazu::vratiUpitZaDodavanjeUTabelu("korisnik", $nizKolonaUTabeli, $nizVrednosti);//niz kolona nek bude da treba za azuriranje
   
        if(!$konekcijaKaBazi->query($sadrzajUpita))
        {
            $greska = $konekcijaKaBazi->error;
            print "<p>".$greska."</p>";
        }
        $konekcijaKaBazi->close();
    }
	
    //potencijalno moze da prima argumente koji sluze za selekciju voznji
    //takodje spojiti tabele voznje_korisnika i voznja, ili inner join, ili ugnjezdeni upit
    //dodat je argument za filtriranje
    public function vratiSveVoznje($filteri){
        $konekcijaKaBazi= KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        $selektovanje= KonstanteZaBazu::vratiUpitZaSelekcijuIzTabele("*", "voznja", $filteri);
        $podaci_o_voznjama=$konekcijaKaBazi->query($selektovanje);
        return $podaci_o_voznjama;
    }

    //mozda da ubacim i novi argument neki...
    public function obrisiKorisnika($usernameKojiSeBrise)
    {
        $konekcijaKaBazi = KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        $sadrzajUpita = KonstanteZaBazu::vratiUpitZaBrisanjeIzTabele("korisnik", "username='".$usernameKojiSeBrise."'");
        if(!$konekcijaKaBazi->query($sadrzajUpita))
        {
            $greska = $konekcijaKaBazi->error;
            print "<p>".$greska."</p>";
        }
        $konekcijaKaBazi->close();
    }
 
    //nova funkcija, a ne treba mi funkcija za id uopste
    public function vratiKorisnika($username)
    {
        $konekcijaKaBazi = KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        $sadrzajUpita = KonstanteZaBazu::vratiUpitZaSelekcijuIzTabele("*", "korisnik", "username='".$username."'");
        $podaciOKorisniku = array("greska" => "false");
        $ishodUpita = $konekcijaKaBazi->query($sadrzajUpita);
        $konekcijaKaBazi->close();
        return $ishodUpita; //mora da se proverava da li je null, takodje konekciju cu da zatvorim pre ovoga
    }
    
    //opet nek se nadje
    public function vratiKorisnikaPoIDu($idKorisnika)
    {
        $konekcijaKaBazi = KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        $sadrzajUpita = KonstanteZaBazu::vratiUpitZaSelekcijuIzTabele("*", "korisnik", "idkorisnik='".$idKorisnika."'");
        $ishodUpita = $konekcijaKaBazi->query($sadrzajUpita);
        if($ishodUpita)
        {
            $konekcijaKaBazi->close();
            return $ishodUpita;
        }
        $konekcijaKaBazi->close();
    }
    //ovo ce da radi sa voznjama
    public function dodajNovuVoznju($cena_puta, $broj_mesta, $mogucnost_prtljaga, $polaznaLokacija, $destinacija, $datumPolaska, $dodatneInformacije)
    {
        $nizKolonaUTabeli = array("cena_puta", "broj_mesta", "mogucnost_prtljaga", "polazna_lokacija", "destinacija", "datum_polaska", "dodatne_informacije");
        $nizVrednosti=array("$cena_puta", $broj_mesta, $mogucnost_prtljaga, "$polaznaLokacija","$destinacija", $datumPolaska, $dodatneInformacije);
        $konekcijaKaBazi= KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        $sadrzajUpita= KonstanteZaBazu::vratiUpitZaDodavanjeUTabelu("voznja", $nizKolonaUTabeli, $nizVrednosti);
        
        if(!$konekcijaKaBazi->query($sadrzajUpita)){
            $greska=$konekcijaKaBazi->error;
            print"<p>".$greska."</p>";
        }

        $lastid = $konekcijaKaBazi->insert_id;
        $konekcijaKaBazi->close();
        return $lastid;
    }
    
    public function azurirajVoznju($idVoznjeKojaSeMenja, $noviBrojMesta, $noveInformacije) 
    {
        $konekcijaKaBazi= KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        $nizKolonaUTabeli=array("broj_mesta", "dodatne_informacije");
        $nizNovihPodatakaZaTabelu=array($noviBrojMesta, $noveInformacije);
        $sadrzajUpita= KonstanteZaBazu::vratiUpitZaAzuriranjeTabele("voznja", $nizKolonaUTabeli, $nizNovihPodatakaZaTabelu, "idvoznja", $idVoznjeKojaSeMenja);
                
        if(!$konekcijaKaBazi->query($sadrzajUpita))
        {
            $greska = $konekcijaKaBazi->error;
            print "<p>".$greska."</p>";
        }
        $konekcijaKaBazi->close();
    }
    
    public function ukloniVoznju($idVoznjeKojaSeBrise)
    {
        $konekcijaKaBazi = KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        $sadrzajUpita = KonstanteZaBazu::vratiUpitZaBrisanjeIzTabele("voznja", "idvoznja='".$idVoznjeKojaSeBrise."'");//moram i ovo da parametrizujem (ipak ne, al string ce biti uslov)
      
        if(!$konekcijaKaBazi->query($sadrzajUpita))
        {
            $greska = $konekcijaKaBazi->error;
            print "<p>".$greska."</p>";
        }
        $konekcijaKaBazi->close();
    }
    
    public function dodajNovuVoznjuKorisniku($voznjaId, $korisnikId, $statusKorisnikaUVoznji) 
    {
        $ishodSmanjenja = array("nemaMesta" => "false");
        if ($statusKorisnikaUVoznji == '0')
            $ishodSmanjenja = $this->smanjiBrojMestaUVoznji($voznjaId);
        if($ishodSmanjenja["nemaMesta"] == "false")
        {
            $nizKolonaUTabeli=array("voznjaId", "korisnikId", "status");
            $nizVrednosti=array($voznjaId, $korisnikId, $statusKorisnikaUVoznji);
            $konekcijaKaBazi= KonstanteZaBazu::uspostaviKonekcijuKaBazi();
            $sadrzajUpita= KonstanteZaBazu::vratiUpitZaDodavanjeUTabelu("voznje_korisnika", $nizKolonaUTabeli, $nizVrednosti);
            if(!$konekcijaKaBazi->query($sadrzajUpita))
            {
                $greska = $konekcijaKaBazi->error;
                print "<p>".$greska."</p>";
            }
            $konekcijaKaBazi->close();
            return $ishodSmanjenja;
        }
        else
            return $ishodSmanjenja;
    }
    
    public function smanjiBrojMestaUVoznji($idVoznje)
    {
        $konekcijaKaBazi = KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        
        $upitZaBrojMesta = KonstanteZaBazu::vratiUpitZaSelekcijuIzTabele("broj_mesta", "voznja", "idvoznja='".$idVoznje."'");
        $ishod = $konekcijaKaBazi->query($upitZaBrojMesta);
        $redUBazi = mysqli_fetch_assoc($ishod);
        $stariBrojMesta = $redUBazi["broj_mesta"];
        
        $feedback = array("nemaMesta" => "false");
        if($stariBrojMesta == 0)
        {
            $feedback["nemaMesta"] = "true";
            $konekcijaKaBazi->close();
            return $feedback;
        }
        else
        {
            $feedback["nemaMesta"] = "false";
            $noviBrojMestaNiz = [$stariBrojMesta - 1];
            $broj_mestaNiz = ["broj_mesta"];
            $sadrzajUpita = KonstanteZaBazu::vratiUpitZaAzuriranjeTabele("voznja", $broj_mestaNiz, $noviBrojMestaNiz, "idvoznja", $idVoznje);
            $konekcijaKaBazi->query($sadrzajUpita);
            $konekcijaKaBazi->close();
            return $feedback;
        }
        $konekcijaKaBazi->close();
    }

    public function dodajBrojMestaUVoznji($idVoznje)
    {
        $konekcijaKaBazi = KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        
        $upitZaBrojMesta = KonstanteZaBazu::vratiUpitZaSelekcijuIzTabele("broj_mesta", "voznja", "idvoznja='".$idVoznje."'");
        $ishod = $konekcijaKaBazi->query($upitZaBrojMesta);
        $redUBazi = mysqli_fetch_assoc($ishod);
        $stariBrojMesta = $redUBazi["broj_mesta"];
        
        $noviBrojMestaNiz = [$stariBrojMesta + 1];
        $broj_mestaNiz = ["broj_mesta"];
        $sadrzajUpita = KonstanteZaBazu::vratiUpitZaAzuriranjeTabele("voznja", $broj_mestaNiz, $noviBrojMestaNiz, "idvoznja", $idVoznje);
        $konekcijaKaBazi->query($sadrzajUpita);
        
        $konekcijaKaBazi->close();
    }
    //takodje trebam da testiram ujutru, sad cu da sve ovo commit-ujem na git, pa da odmorim partiju
    public function ukloniVoznjuKorisniku($idVoznjeKojaSeBrise, $idKorisnikaKojiSeBrise)
    {
        //if status 0
        
        $this->dodajBrojMestaUVoznji($idVoznjeKojaSeBrise);
        $konekcijaKaBazi= KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        $sadrzajUpita= KonstanteZaBazu::vratiUpitZaBrisanjeIzTabele("voznje_korisnika", "voznjaId='".$idVoznjeKojaSeBrise."' AND korisnikId='".$idKorisnikaKojiSeBrise."'");
        if(!$konekcijaKaBazi->query($sadrzajUpita))
        {
            $greska = $konekcijaKaBazi->error;
            print "<p>".$greska."</p>";
        }
        //if status 1 
        $konekcijaKaBazi->close();
    }
    
    public function vratiIdVozacaZaVoznju($idVoznje)
    {
        $konekcijaKaBazi = KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        $sadrzajUpita = KonstanteZaBazu::vratiUpitZaSelekcijuIzTabele("korisnikId", "voznje_korisnika", "voznjaId='".$idVoznje."' AND status='1'");
        $ishodUpita = $konekcijaKaBazi->query($sadrzajUpita);
        if(mysqli_num_rows($ishodUpita) > 0)
        {
            $redIzTabele = mysqli_fetch_assoc($ishodUpita);
            $konekcijaKaBazi->close();
            return $redIzTabele["korisnikId"];
        }
        $konekcijaKaBazi->close();
    }
    
    public function vratiStatusPrijavljenogKorisnika($idNekeVoznje, $idTrenutnoUlogovanogKorisnika)
    {
        $konekcijaKaBazi = KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        //ovo cu da zovem sa $_SESSION["id"], al moram i voznju da ubacim za id
        $sadrzajUpita = KonstanteZaBazu::vratiUpitZaSelekcijuIzTabele("*", "voznje_korisnika", "voznjaId='".$idNekeVoznje."' AND korisnikId='".$idTrenutnoUlogovanogKorisnika."'");
        $ishodUpita = $konekcijaKaBazi->query($sadrzajUpita);
        if(mysqli_num_rows($ishodUpita) > 0)
        {
            $redIzTabele = mysqli_fetch_assoc($ishodUpita);
            $konekcijaKaBazi->close();
            return $redIzTabele["status"];
        }
        else
        {
            $konekcijaKaBazi->close();
            return -1;
        }
    }
    
    public function vratiPutnikeNaVoznji($idVoznje)
    {
        $konekcijaKaBazi = KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        $sadrzajUpita = KonstanteZaBazu::vratiUpitZaSelekcijuIzTabele("korisnikId", "voznje_korisnika", "voznjaId='".$idVoznje."' AND status='0'");
        //ovo gore moze da vrati niz id-jeva korisnika, sad idemo dalje
        $ishodUpita = $konekcijaKaBazi->query($sadrzajUpita);
        if($ishodUpita)
        {
            $listaPutnikaNaVoznji = array();
            $putnikNaVoznji = array();
            while($redIzTabele = mysqli_fetch_assoc($ishodUpita))
            {
                //ovo gore ce da izbacuje id-eve putnika na voznji, sto znaci da to mogu da upotrebim u drugoj tabeli
                $podaciOKorisniku = $this->vratiKorisnikaPoIDu($redIzTabele["korisnikId"]);//ovde imam niz podataka o JEDNOM korisniku
                $redIzTabeleKorisnika = mysqli_fetch_assoc($podaciOKorisniku);
                
                $putnikNaVoznji["idKorisnik"] = $redIzTabeleKorisnika["idkorisnik"];
                $putnikNaVoznji["ime"] = $redIzTabeleKorisnika["ime"];
                $putnikNaVoznji["prezime"] = $redIzTabeleKorisnika["prezime"];
                $putnikNaVoznji["godina_rodjenja"] = $redIzTabeleKorisnika["godina_rodjenja"];
                $putnikNaVoznji["godine_iskustva"] = $redIzTabeleKorisnika["godine_iskustva"];
                $putnikNaVoznji["pol"] = $redIzTabeleKorisnika["pol"];
                $putnikNaVoznji["email"] = $redIzTabeleKorisnika["email"];
                $putnikNaVoznji["broj_telefona"] = $redIzTabeleKorisnika["broj_telefona"];
                $putnikNaVoznji["username"] = $redIzTabeleKorisnika["username"];
                $putnikNaVoznji["rating"] = $redIzTabeleKorisnika["rating"];
                $putnikNaVoznji["admin"] = $redIzTabeleKorisnika["admin"];
                
                $listaPutnikaNaVoznji[] = $putnikNaVoznji;
            }
            $konekcijaKaBazi->close();
            return $listaPutnikaNaVoznji;
        }
        $konekcijaKaBazi->close();
    }
    
    public function preracunajProsecnuOcenuKorisniku($idKorisnika)
    {
        $konekcijaKaBazi = KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        $upitZaSelekciju = KonstanteZaBazu::vratiUpitZaSelekcijuIzTabele("ocenakorisnika", "ocena", "korisnikIdD='".$idKorisnika."'");
        $ishodUpita = $konekcijaKaBazi->query($upitZaSelekciju);
        
        $brojOcena = mysqli_num_rows($ishodUpita);
        $sumaOcena = 0;
        while($redIzTabele = mysqli_fetch_assoc($ishodUpita))
            $sumaOcena += $redIzTabele["ocenakorisnika"];
        
        $nizVrednosti = array();
        $nizKolona = array("rating");
        $nizVrednosti = array($sumaOcena/$brojOcena);
        $upitZaAzuriranjeOcene = KonstanteZaBazu::vratiUpitZaAzuriranjeTabele("korisnik", $nizKolona, $nizVrednosti, "idkorisnik", $idKorisnika);
        $konekcijaKaBazi->query($upitZaAzuriranjeOcene);        
        $konekcijaKaBazi->close();

        
        return $sumaOcena/$brojOcena;
    }
    
    public function dodajOcenu()
    {
        $nizKolonaUTabeli=array("korisnikIdP", "korisnikIdD", "ocenakorisnika");
        $nizVrednosti=array($korisnikPrvi, $korisnikDrugi, $ocena);
        $konekcijaKaBazi= KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        $sadrzajUpita= KonstanteZaBazu::dodajUTabelu("ocena", $nizKolonaUTabeli, $nizVrednosti);
        if(!$konekcijaKaBazi->query($sadrzajUpita))
        {
            $greska = $konekcijaKaBazi->error;
            print "<p>".$greska."</p>";
        }
        $konekcijaKaBazi->close();
    }
    
    public function dodeliAdmina($idKorisnika){
        $konekcijaKaBazi= KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        $nizKolonaUTabeli = array("admin");
        $nizVrednosti=array('1');
        $rezUpita= KonstanteZaBazu::vratiUpitZaAzuriranjeTabele("korisnik",$nizKolonaUTabeli,$nizVrednosti,"idkorisnik",$idKorisnika);
        $rez=$konekcijaKaBazi->query($rezUpita);
        $konekcijaKaBazi->close();
    }

}