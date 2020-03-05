<?php
require_once '../BazaPodataka/lib.php';

session_start();

if(isset($_POST["username"]))
{
    //mozda je zajebao email, a mozda je zajebao i sifru
    $nizPotencijalnihGresaka = array("javilaSeGreska" => "false"); //ovo se salje po referenci, tj trebalo bi
    KonstanteZaBazu::validacijaUsernameNePostoji($nizPotencijalnihGresaka, $_POST["username"]);
    if($nizPotencijalnihGresaka["javilaSeGreska"] == "false")
    {
        KonstanteZaBazu::validacijaLozinke($nizPotencijalnihGresaka, $_POST["username"], $_POST["lozinka"]);
        if($nizPotencijalnihGresaka["javilaSeGreska"] == "false")
        {
            $servisBazePodataka = new BazaPodatakaService();
            $podaciOKorisnikuIzBaze = $servisBazePodataka->vratiKorisnika($_POST["username"]);
            if($podaciOKorisnikuIzBaze)
            {
                $redIzBaze = mysqli_fetch_assoc($podaciOKorisnikuIzBaze);
                $_SESSION["ime"] = $redIzBaze["ime"];//i ostale stvari koje trebaju da se vade
                $_SESSION["id"] = $redIzBaze["idkorisnik"];//mislim da se ovo vec nalazi u funkciji koja vraca podatke
                $_SESSION["username"] = $_POST["username"];
                $_SESSION["admin"] = KonstanteZaBazu::validacijaAdmina($_POST["username"]);
            }
        }
    }
    echo json_encode($nizPotencijalnihGresaka);
}