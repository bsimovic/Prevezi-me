<?php
require_once '../BazaPodataka/lib.php';
session_start();

if(isset($_SESSION["username"]))
{
    //da sprecim da vozac samog sebe oceni
    $bazaPodatakaService = new BazaPodatakaService();
    if($_SESSION["id"] != $_POST["idKorisnikaD"])
    {
        $konekcijaKaBazi = KonstanteZaBazu::uspostaviKonekcijuKaBazi();
        //da li korisnik ima ocenu?
        $upitPostojanjaOcene = KonstanteZaBazu::vratiUpitZaSelekcijuIzTabele("*", "korisnik", "idkorisnik='".$_POST["idKorisnikaD"]."' AND rating='0'");
        //da li je korisnik vec ocenjen od strane ulogovanog korisnika?
        $upitVecOcenjen = KonstanteZaBazu::vratiUpitZaSelekcijuIzTabele("*", "ocena", "korisnikIdD='".$_POST["idKorisnikaD"]."' AND korisnikIdP='".$_SESSION["id"]."'");
        $ishodUpitaPostojanje = $konekcijaKaBazi->query($upitPostojanjaOcene);
        $ishodUpitaVecOcenjen = $konekcijaKaBazi->query($upitVecOcenjen);
        //ako nema ocenu
        if(mysqli_num_rows($ishodUpitaPostojanje) > 0)
        {
            //azuriraj ocenu korisniku
            $nizKolona = array("rating");
            $nizVrednosti = array($_POST["ocena"]);
            $azurirajOcenu = KonstanteZaBazu::vratiUpitZaAzuriranjeTabele("korisnik", $nizKolona, $nizVrednosti, "idkorisnik", $_POST["idKorisnikaD"]);
            $konekcijaKaBazi->query($azurirajOcenu);

            $nizKolona = array("korisnikIdP", "korisnikIdD", "ocenakorisnika");
            $nizVrednosti = array($_SESSION["id"], $_POST["idKorisnikaD"], $_POST["ocena"]);
            if (mysqli_num_rows($ishodUpitaVecOcenjen) == 0)
                $dodajOcenu = KonstanteZaBazu::vratiUpitZaDodavanjeUTabelu("ocena", $nizKolona, $nizVrednosti);
            else
                $dodajOcenu = "UPDATE ocena SET ocenakorisnika = '".$_POST["ocena"]."' WHERE korisnikIdP = ".$_SESSION["id"]." AND korisnikIdD = ".$_POST["idKorisnikaD"];
            $konekcijaKaBazi->query($dodajOcenu);

            $ocenaKaoJSON = array("ocena" => $_POST["ocena"]);
            echo json_encode($ocenaKaoJSON);
        }
        else //ako ima ocenu
        {
            $nizKolona = array("korisnikIdP", "korisnikIdD", "ocenakorisnika");
            $nizVrednosti = array($_SESSION["id"], $_POST["idKorisnikaD"], $_POST["ocena"]);
            if (mysqli_num_rows($ishodUpitaVecOcenjen) == 0)
                $dodajOcenu = KonstanteZaBazu::vratiUpitZaDodavanjeUTabelu("ocena", $nizKolona, $nizVrednosti);
            else
                $dodajOcenu = "UPDATE ocena SET ocenakorisnika = '".$_POST["ocena"]."' WHERE korisnikIdP = ".$_SESSION["id"]." AND korisnikIdD = ".$_POST["idKorisnikaD"];
            $konekcijaKaBazi->query($dodajOcenu);

            $novaOcena = $bazaPodatakaService->preracunajProsecnuOcenuKorisniku($_POST["idKorisnikaD"]);
            $nizKolona = array("rating");
            $nizVrednosti = array($novaOcena);
            $azurirajOcenu = KonstanteZaBazu::vratiUpitZaAzuriranjeTabele("korisnik", $nizKolona, $nizVrednosti, "idkorisnik", $_POST["idKorisnikaD"]);
            $konekcijaKaBazi->query($azurirajOcenu);

            $ocenaKaoJSON = array("ocena" => $novaOcena);
            echo json_encode($ocenaKaoJSON);
        }
     
        $konekcijaKaBazi->close();
    }
    else 
        echo json_encode(0);
}