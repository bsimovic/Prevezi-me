<?php
require_once '../BazaPodataka/lib.php';
session_start();

if(isset($_SESSION["username"]))
{
    $bazaPodatakaService = new BazaPodatakaService();
    $statusKorisnika = $bazaPodatakaService->vratiStatusPrijavljenogKorisnika($_POST["idVoznje"], $_SESSION["id"]);
    if($statusKorisnika == 1) {
        $bazaPodatakaService->azurirajVoznju($_POST["idVoznje"], $_POST["noviBrojMesta"], $_POST["noveInformacije"]);
    }
}