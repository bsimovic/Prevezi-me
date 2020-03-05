<?php

class KonstanteZaBazu
{
    const IME_HOSTA = "localhost";
    const IME_KORISNIKA = "root";
    const SIFRA_KORISNIKA = "";
    const IME_BAZE = "prevezi_me_db";
    
    private function __construct() {} //da se osiguram da nema instanciranja, tako internet kaze
   
    public static function uspostaviKonekcijuKaBazi()
    {
        $konekcijaKaBazi = new mysqli(self::IME_HOSTA, self::IME_KORISNIKA, self::SIFRA_KORISNIKA, self::IME_BAZE);
        $konekcijaKaBazi->set_charset('utf8');
        if($konekcijaKaBazi->connect_errno)
        {
            printf("Neuspela konekcija: " . $konekcijaKaBazi->connect_error);
            exit();
        }
        return $konekcijaKaBazi;
    }
   
    public static function vratiUpitZaSelekcijuIzTabele($listaAtributa, $nazivTabele, $uslov)
    {
        $upitSelekcije = "SELECT " . $listaAtributa . " FROM " . $nazivTabele . " WHERE " . $uslov;
        return $upitSelekcije;
    }

    public static function vratiUpitZaBrisanjeIzTabele($nazivTabele, $uslov)
    {
        if(!$uslov)
        {
            echo "Greska, nije naveden uslov ";
            exit();
        }
        $upitZaBrisanje = "DELETE FROM " . $nazivTabele . " WHERE " . $uslov;
        return $upitZaBrisanje;
    }
    
    public static function vratiUpitZaDodavanjeUTabelu($nazivTabele, $nizKolona, $nizVrednosti)
    {
        $nizKolonaOdvojenihZarezom = implode(",", $nizKolona);
        $nizVrednostiOdvojenihZarezom = "'" . implode("','", $nizVrednosti) . "'";
        
        $upitZaDodavanje = "INSERT INTO " . $nazivTabele . "(".$nizKolonaOdvojenihZarezom.")" 
                            . " VALUES(" . $nizVrednostiOdvojenihZarezom . ")";
        return $upitZaDodavanje;
    }
    
    //dodat je novi argument pre id-ja
    public static function vratiUpitZaAzuriranjeTabele($nazivTabele, $nizKolona, $nizVrednosti, $nazivIdentifikatoraUTabeli, $idEntitetaKojiSeAzurira)
    {
        if(!$idEntitetaKojiSeAzurira)
        {
            echo "Greska, nije dat identifikator elementa koji se azurira";
            exit();
        }
        if(count($nizKolona) != count($nizVrednosti))
        {
            echo "Greska, broj navedenih kolona u tabeli se ne slaze sa brojem vrednosti " . "<br/>";
            exit();
        }
     
        $nizDodelaKolonaIVrednosti = array();
        for($i=0; $i < count($nizKolona); $i++)
        {
            $vrednost = "'$nizVrednosti[$i]'";
            $nizDodelaKolonaIVrednosti[] = "$nizKolona[$i] = $vrednost";
        }
        
        $linijaKojaIdeUSet = implode(",", $nizDodelaKolonaIVrednosti);
        $upitZaAzuriranje = "UPDATE $nazivTabele SET $linijaKojaIdeUSet WHERE $nazivIdentifikatoraUTabeli='".$idEntitetaKojiSeAzurira."'";
        return $upitZaAzuriranje;
    }
    
    public static function validacijaEmaila(&$nizPotencijalnihGresaka, $prosledjeniEmail)
    {
        //primetiti self i referencu za niz potencijalnih gresaka
        $upitProvereEMaila = self::vratiUpitZaSelekcijuIzTabele("email", "korisnik", "email='".$prosledjeniEmail."'");
        $konekcijaKaBazi = self::uspostaviKonekcijuKaBazi();
        $ishodUpita = $konekcijaKaBazi->query($upitProvereEMaila);
        if($ishodUpita->num_rows > 0)
        {
            $nizPotencijalnihGresaka["javilaSeGreska"] = "true";
            $nizPotencijalnihGresaka["emailGreska"] = "true";
        }
    }
    
    public static function validacijaUsernamePostoji(&$nizPotencijalnihGresaka, $prosledjeniUsername)
    {
        $upitProvereUsername = self::vratiUpitZaSelekcijuIzTabele("username", "korisnik", "username='".$prosledjeniUsername."'");
        $konekcijaKaBazi = self::uspostaviKonekcijuKaBazi();
        $ishodUpita = $konekcijaKaBazi->query($upitProvereUsername);
        if($ishodUpita->num_rows > 0)
        {
            $nizPotencijalnihGresaka["javilaSeGreska"] = "true";
            $nizPotencijalnihGresaka["usernameGreska"] = "true";
        }
    }

    public static function validacijaUsernameNePostoji(&$nizPotencijalnihGresaka, $prosledjeniUsername)
    {
        $upitProvereUsername = self::vratiUpitZaSelekcijuIzTabele("username", "korisnik", "username='".$prosledjeniUsername."'");
        $konekcijaKaBazi = self::uspostaviKonekcijuKaBazi();
        $ishodUpita = $konekcijaKaBazi->query($upitProvereUsername);
        if($ishodUpita->num_rows == 0)
        {
            $nizPotencijalnihGresaka["javilaSeGreska"] = "true";
            $nizPotencijalnihGresaka["usernameGreska"] = "true";
        }
    }
    
    //ovo ima dva parametra, korisnik i lozinka, ovo samo sa lozinkom nema logike
    public static function validacijaLozinke(&$nizPotencijalnihGresaka, $prosledjeniUsername, $prosledjenaLozinka)
    {
        $upitTacnaLozinka = self::vratiUpitZaSelekcijuIzTabele("lozinka", "korisnik", "username='".$prosledjeniUsername."' AND lozinka='".$prosledjenaLozinka."'");
		$konekcijaKaBazi = self::uspostaviKonekcijuKaBazi();
        $ishodUpita = $konekcijaKaBazi->query($upitTacnaLozinka);
        if($ishodUpita->num_rows == 0)//ovo znaci da nema korisnika sa tom lozinkom (bezbednost level 4000)
        {
            $nizPotencijalnihGresaka["javilaSeGreska"] = "true";
            $nizPotencijalnihGresaka["passwordGreska"] = "true";
        }
    }
    
    public static function validacijaAdmina($usernameKorisnika)
    {
        $upitZaAdmina = self::vratiUpitZaSelekcijuIzTabele("*", "korisnik", "username='".$usernameKorisnika."' AND admin='1'");
        $konekcijaKaBazi = self::uspostaviKonekcijuKaBazi();
        $ishodUpita = $konekcijaKaBazi->query($upitZaAdmina);
        
        if(mysqli_num_rows($ishodUpita) > 0)
            return 1;
        else
            return 0;
    }
}
