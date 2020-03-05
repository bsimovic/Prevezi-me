<?php
session_start();

$odgovorNaZahtev = array("nekoJeUlogovan" => "false");

if(isset($_SESSION["username"]))
{
    $odgovorNaZahtev["nekoJeUlogovan"] = "true";
    $odgovorNaZahtev["ime"] = $_SESSION["ime"];
    $odgovorNaZahtev["username"] = $_SESSION["username"];
    $odgovorNaZahtev["admin"] = $_SESSION["admin"];
    $odgovorNaZahtev["id"] = $_SESSION["id"];
}

echo json_encode($odgovorNaZahtev);