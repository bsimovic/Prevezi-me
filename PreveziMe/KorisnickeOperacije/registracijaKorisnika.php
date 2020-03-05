<?php
require_once '../BazaPodataka/lib.php';//mozda cu moram da stelujem
session_start();

//dodavanje korisnika
if(isset($_POST["username"]))
{
    $nizPotencijalnihGresaka = array("javilaSeGreska" => "false");
    KonstanteZaBazu::validacijaUsernamePostoji($nizPotencijalnihGresaka, $_POST["username"]);    
   
    $servisBazePodataka = new BazaPodatakaService();
    
    if($nizPotencijalnihGresaka["javilaSeGreska"] == "false")
    {
        $servisBazePodataka->dodajNovogKorisnika($_POST["ime"], $_POST["prezime"], $_POST["godinaRodjenja"], $_POST["godineIskustva"], 
            $_POST["pol"], $_POST["lozinka"], $_POST["email"], $_POST["brojTelefona"], $_POST["username"], $_POST["rating"], $_POST["admin"]);
    }
    echo json_encode($nizPotencijalnihGresaka);
}