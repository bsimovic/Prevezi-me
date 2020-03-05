<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include_once 'lib.php';
$baza=new BazaPodatakaService();

if(isset($_GET["voznjaId"])){
    $baza->vratiIdSvihKorisnikaZaVoznju($_GET["voznjaId"]);
}


?>