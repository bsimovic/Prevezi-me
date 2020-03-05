<?php

include_once '../BazaPodataka/lib.php';
session_start();

$baza=new BazaPodatakaService();

$statusKorisnika = $baza->vratiStatusPrijavljenogKorisnika($_POST["idvoznja"], $_SESSION["id"]);
if($_SESSION["admin"] == 1 || $statusKorisnika == 1)
{
    $moguceGreske = array("greskaNaVidiku" => "false");
    if(isset($_POST["idvoznja"]))
    {
        $baza->ukloniVoznju($_POST["idvoznja"]);
        $moguceGreske["greskeNaVidiku"] = "false";
        $moguceGreske["status"] = "Uspesno uklonjena voznja"; // da se cisto vidi da je sve ok
    }
    else {
        $moguceGreske["greskeNaVidiku"] = "true";
        $moguceGreske["status"] = "Voznja nije uklonjena"; // da se cisto vidi da je sve ok
    }
    echo json_encode($moguceGreske);
}
?>