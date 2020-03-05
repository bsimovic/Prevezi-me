<?php
require_once './BazaPodataka/lib.php';

session_start();//bitan korak
 $konekcijaKaBazi = new BazaPodatakaService();//zbog autocomplete-a cu da ovo ubacim dole (bem ga...)


//dodavanje korisnika u bazu (ISPRAVITI USLOV ZA LOZINKU)
if(isset($_POST["username"]))
{
    $konekcijaKaBazi = new BazaPodatakaService();
    //mislim da znam koja je fora sa autocomplete-om => stvar je u scope-u, tj lokalan/globalan, global se treba ubaci, itd itd
    $konekcija = KonstanteZaBazu::uspostaviKonekcijuKaBazi();
    $nizPotencijalnihGresaka = array("javilaSeGreska" => "false");
    //KonstanteZaBazu::validacijaUsername($nizPotencijalnihGresaka, $_POST["username"]);    
    //KonstanteZaBazu::validacijaLozinke($nizPotencijalnihGresaka, $_POST["username"], $_POST["lozinka"]);
   
    if($nizPotencijalnihGresaka["javilaSeGreska"] == "false")
    {
        //ne sugerise nista, a kad izvrsim ovaj metod on sam uspostavlja konekciju i sve ostalo
        $konekcijaKaBazi->dodajNovogKorisnika($_POST["ime"], $_POST["prezime"], $_POST["godinaRodjenja"], $_POST["godineIskustva"], 
            $_POST["pol"], $_POST["lozinka"], $_POST["email"], $_POST["brojTelefona"], $_POST["username"], $_POST["rating"], $_POST["admin"]);

        //ovde cu da ubacim podatke za sesiju ako treba jos nesto
        $_SESSION["username"] = $_POST["username"];
        $_SESSION["admin"] = $_POST["admin"];
    }
    echo json_encode($nizPotencijalnihGresaka);
    $konekcija->close();
}

//izmena postojeceg korisnika, sto znaci da neko mora biti prijavljen da bi mogao da menja podatke
if(isset($_SESSION["username"]))
{
    //ocekujem da je sve ovo u $_POST nizu poslato...
    $nizPotencijalnihGresaka = array("javilaSeGreska" => "false");
    KonstanteZaBazu::validacijaEmaila($nizPotencijalnihGresaka, $_SESSION["email"]);
    KonstanteZaBazu::validacijaUsername($nizPotencijalnihGresaka, $_POST["noviUsername"]);
    
    if($nizPotencijalnihGresaka["javilaSeGreska"] == "false")
        $konekcijaKaBazi->azurirajKorisnika($_POST["id"], $_POST["novoIskustvo"], $_POST["novaLozinka"], $_POST["novEmail"],
            $_POST["noviBrojTelefona"], $_POST["noviUsername"], $_POST["novRating"]);
    
    echo json_encode($nizPotencijalnihGresaka);//posle se ispituje u front-endu, ako nema nista, onda ispisuje poruku neku o uspehu
}

//brisanje korisnika, ovo zahteva da je admin prijavljen
if($_SESSION["admin"] = 1)
{
    $nizPotencijalnihGresaka = array("javilaSeGreska" => "false");
    if(isset($_POST["idZaBrisanje"]))
    {//nepoklapanje sa argumentom koji funkcija za brisanje zahteva
        $konekcijaKaBazi = KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        $upitProverePostojanjaKorisnika = KonstanteZaBazu::vratiUpitZaSelekcijuIzTabele("idkorisnik", "korisnik", "idkorisnik='".$_POST["idZaBrisanje"]."'");
        $ishodUpita = $konekcijaKaBazi->query($upitProverePostojanjaKorisnika);
        if($ishodUpita->num_rows == 0 )
        {
            $nizPotencijalnihGresaka["javilaSeGreska"] = "true";
            $nizPotencijalnihGresaka["greskaId"] = "Ne postoji korisnik pod navedenim id-jem";
        }
        else
        {
            $konekcijaKaBazi->obrisiKorisnika($_POST["idZaBrisanje"]);
            $nizPotencijalnihGresaka["javilaSeGreska"] = "false";
            $nizPotencijalnihGresaka["statusOperacije"] = "Uspesno je obrisan korisnik, a posto je cascade, i sve njegovo";
        }
    }
    echo json_encode($nizPotencijalnihGresaka);
}

//sad mi treba prijava i odjava korisnika...
if(isset($_POST["prosledjeniEmailZaPrijavuKorisnika"]))
{
    //mozda je zajebao email, a mozda je zajebao i sifru
    $nizPotencijalnihGresaka = array("javilaSeGreska" => "false");
    KonstanteZaBazu::validacijaEmaila($nizPotencijalnihGresaka, $_POST["prosledjeniEmailZaProjavuKorisnika"]);
    KonstanteZaBazu::validacijaLozinke($nizPotencijalnihGresaka, $_POST["prosledjeniEmailZaProjavuKorisnika"], $prosledjenaLozinka);

    if($nizPotencijalnihGresaka["javilaSeGreska"] == "false")
    {
        $_SESSION["username"] = $_POST["username"];
        $_SESSION["admin"] = KonstanteZaBazu::validacijaAdmina($_POST["username"]);
    }
    echo json_encode($nizPotencijalnihGresaka);
}

//odjava korisnika, ubedljivo najmanje ima da se pise, samo da vidim dal salje nieko link ili sta vec
if(isset($_POST["odjavaKorisnika"]))
{
    session_destroy();
}