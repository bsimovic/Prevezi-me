<?php
require_once '../BazaPodataka/lib.php';//mozda moram da stelujem

session_start();

if(isset($_SESSION["username"]))
{
    //moze da zajebava...
    $nizPotencijalnihGresaka = array("javilaSeGreska" => "false");
    
    $operacijeNadBazom = new BazaPodatakaService();
    
    //poslacu mu stari username, on je u sesiji => e sad, moram i u sesiji da promenim podatke (username, email)
    if($nizPotencijalnihGresaka["javilaSeGreska"] == "false")
        $operacijeNadBazom->azurirajKorisnika($_SESSION["username"], $_POST["novoIskustvo"], $_POST["novaLozinka"], $_POST["novEmail"], $_POST["noviBrojTelefona"]);
    
    echo json_encode($nizPotencijalnihGresaka);//posle se ispituje u front-endu, ako nema nista, onda ispisuje poruku neku o uspehu
}