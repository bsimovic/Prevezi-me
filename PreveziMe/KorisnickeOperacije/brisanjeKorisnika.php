<?php
require_once '../BazaPodataka/lib.php';
session_start();

//brisanje preko username-a se obavlja
if($_SESSION["admin"] = 1)
{
    $nizPotencijalnihGresaka = array("javilaSeGreska" => "false");
    if(isset($_POST["username"]))
    {
        KonstanteZaBazu::validacijaUsernameNePostoji($nizPotencijalnihGresaka, $_POST["username"]);
        if ($nizPotencijalnihGresaka["javilaSeGreska"] == 'false') {
            $servisBazePodataka = new BazaPodatakaService();
            $servisBazePodataka->obrisiKorisnika($_POST["username"]); //automatski to menjam i u interfejsu
            //valjda ne trebam da hendlujem brisanje, jednom se izbrise i to je
            $nizPotencijalnihGresaka["javilaSeGreska"] = "false";
            $nizPotencijalnihGresaka["statusOperacije"] = "Uspesno je obrisan korisnik, a posto je cascade, i sve njegovo";
        }
    }
    echo json_encode($nizPotencijalnihGresaka);
}