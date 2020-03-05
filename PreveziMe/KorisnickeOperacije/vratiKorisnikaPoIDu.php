<?php
require_once '../BazaPodataka/lib.php';

session_start();

if(isset($_POST["idkorisnika"]) && isset($_SESSION["username"]))
{
    $servisBazePodataka = new BazaPodatakaService();
    $ishodUpita = $servisBazePodataka->vratiKorisnikaPoIDu($_POST["idkorisnika"]);
    //on mi je sad vratio sirove podatke, to cu sad da obradim
    if($ishodUpita)
    {
        $redIzTabele = mysqli_fetch_assoc($ishodUpita);
        $korisnik = array();
        $korisnik["idkorisnik"] = $redIzTabele["idkorisnik"];
        $korisnik["ime"] = $redIzTabele["ime"];
        $korisnik["prezime"] = $redIzTabele["prezime"];
        $korisnik["godinaRodjenja"] = $redIzTabele["godina_rodjenja"];
        $korisnik["godineIskustva"] = $redIzTabele["godine_iskustva"];
        $korisnik["pol"] = $redIzTabele["pol"];
        $korisnik["email"] = $redIzTabele["email"];
        $korisnik["brojTelefona"] = $redIzTabele["broj_telefona"];
        $korisnik["username"] = $redIzTabele["username"];
        $korisnik["rating"] = $redIzTabele["rating"];
        $korisnik["admin"] = $redIzTabele["admin"];
        
        echo json_encode($korisnik);//za slucaj da se vraca u frontend, inace menjam logiku
    }
}