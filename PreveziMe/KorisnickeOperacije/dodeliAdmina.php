<?php
require_once '../BazaPodataka/lib.php';
session_start();

$baza=new BazaPodatakaService();

if($_SESSION["admin"] = 1)
{
    if($_POST["IdNovogAdmina"]){
        $baza->dodeliAdmina($_POST["IdNovogAdmina"]);
    }

}

