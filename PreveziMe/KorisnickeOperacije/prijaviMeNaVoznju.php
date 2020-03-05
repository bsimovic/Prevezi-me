<?php
require_once '../BazaPodataka/lib.php';
session_start();

$bazaPodatakaService = new BazaPodatakaService();

if(isset($_SESSION["username"]))
{
    $ishodDodavanja = $bazaPodatakaService->dodajNovuVoznjuKorisniku($_POST["voznjaId"], $_SESSION["id"], '0');

    echo json_encode($ishodDodavanja);
}