<?php
include_once '../BazaPodataka/lib.php';

session_start();

$baza=new BazaPodatakaService();

if (isset($_SESSION["username"])) {

    $lastid = $baza->dodajNovuVoznju($_POST["cena_puta"], $_POST["broj_mesta"], $_POST["mogucnost_prtljaga"], $_POST["polazna_lokacija"], $_POST["destinacija"], $_POST["datum_polaska"], $_POST["dodatne_informacije"]);
    $baza->dodajNovuVoznjuKorisniku($lastid, $_SESSION["id"], '1');
}

?>