<?php
require_once '../BazaPodataka/lib.php';
session_start();

$bazaPodatakaService = new BazaPodatakaService();

if(isset($_SESSION["username"]))
{
    $status=$bazaPodatakaService->vratiStatusPrijavljenogKorisnika($_POST["voznjaId"], $_SESSION["id"]);
    echo $status;
    if($status == "0"){
        $bazaPodatakaService->ukloniVoznjuKorisniku($_POST["voznjaId"], $_SESSION["id"]);
    }
}