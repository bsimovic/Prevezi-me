<?php
session_start(); //bez ovoga nece da radi $_SESSION
//sad cu da prekinem sesiju, pa cu da ponovo pokrenem

$nizSesije = array();
if(isset($_SESSION["username"]))
{
    $nizSesije["prijavljeniKorisnik"] = $_SESSION["username"];
    $nizSesije["administator"] = $_SESSION["admin"];
}
else
    $nizSesije["greska"] = "Nema nicega u sesiji";
    
session_destroy();//da vidimo dal ovo brise sesiju, ili abort, ili nesto trece
echo json_encode($nizSesije);