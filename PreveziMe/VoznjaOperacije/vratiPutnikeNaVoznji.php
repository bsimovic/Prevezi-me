<?php
require_once '../BazaPodataka/lib.php';
session_start();

if(isset($_SESSION["username"]))
{
    $bazaPodatakaService = new BazaPodatakaService();
    $statusPrijavljenogKorisnika = $bazaPodatakaService->vratiStatusPrijavljenogKorisnika($_POST["idVoznje"], $_SESSION["id"]);
    if($statusPrijavljenogKorisnika == 1) //ovo je samo dostupno vozacu, inace nece da se dobije nista
    {
        $sviPutniciNaVoznji = array();//ne znam dal hoce bez ovoga
        $sviPutniciNaVoznji = $bazaPodatakaService->vratiPutnikeNaVoznji($_POST["idVoznje"]);
        echo json_encode($sviPutniciNaVoznji);
    }
}