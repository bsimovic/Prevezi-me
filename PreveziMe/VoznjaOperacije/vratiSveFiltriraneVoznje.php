<?php
require_once '../BazaPodataka/lib.php';
session_start();

$elementiZaSelekciju = array();//kao i sve sto ikad radim ovde => asocijativni niz

if(isset($_POST["polazna_lokacija"]))
{
    $filterZaPolaznuLokaciju = " polazna_lokacija='".$_POST["polazna_lokacija"]."'";
    $elementiZaSelekciju[] = $filterZaPolaznuLokaciju;
}

if(isset($_POST["destinacija"]))
{
    $filterZaDestinaciju = " destinacija='".$_POST["destinacija"]."'";
    $elementiZaSelekciju[] = $filterZaDestinaciju;
}

if(isset($_POST["datum_polaska"]))
{
    $filterZaDatumPolaska = " datum_polaska='".$_POST["datum_polaska"]."'";
    $elementiZaSelekciju[] = $filterZaDatumPolaska;
}

if(isset($_POST["cena_puta"]))
{
    $filterZaCenuPuta = " cena_puta<='".$_POST["cena_puta"]."'";//s tim sto ovde moze bilo sta od > < >= =<, itd
    $elementiZaSelekciju[] = $filterZaCenuPuta;
}

$linijaZaSelekcijuVoznji = implode("AND", $elementiZaSelekciju);//mislim da ovako radi, sad cu da vidim
//copy-paste, al sta je tu je
$baza=new BazaPodatakaService();
$podaci_o_voznjama=$baza->vratiSveVoznje($linijaZaSelekcijuVoznji);
if($podaci_o_voznjama)
{
    $sveVoznje=array();
        
    while($redIzBaze= mysqli_fetch_assoc($podaci_o_voznjama))
    {
        $jednaVoznja["id"]=$redIzBaze["idvoznja"];//ovo je iz tabele za voznju
            
        $upitSelekcije = KonstanteZaBazu::vratiUpitZaSelekcijuIzTabele("korisnikId", "voznje_korisnika", "voznjaId='".$redIzBaze["idvoznja"]."' AND status='1'");
            
        $idVozaca = $baza->vratiIdVozacaZaVoznju($jednaVoznja["id"]);//smatram da ako postoji voznja, mora da postoji vozac koji ju je napravio
        $statusUlogovanogKorisnika = $baza->vratiStatusPrijavljenogKorisnika($jednaVoznja["id"], $_SESSION["id"]);
            
        $jednaVoznja["idVozaca"] = $idVozaca;//valjda ovako, sad da proverim status trenutnog korisnika koji pregleda
        $jednaVoznja["statusUlogovanogKorisnika"] = $statusUlogovanogKorisnika;
        $jednaVoznja["cena_puta"]=$redIzBaze["cena_puta"];
        $jednaVoznja["broj_mesta"]=$redIzBaze["broj_mesta"];
        $jednaVoznja["mogucnost_prtljaga"]=$redIzBaze["mogucnost_prtljaga"];
        $jednaVoznja["destinacija"]=$redIzBaze["destinacija"];
        $jednaVoznja["dodatne_informacije"]=$redIzBaze["dodatne_informacije"];
        $jednaVoznja["polazna_lokacija"]=$redIzBaze["polazna_lokacija"];
        $jednaVoznja["datum_polaska"]=$redIzBaze["datum_polaska"];
        $sveVoznje[]=$jednaVoznja;        
    }
        echo json_encode($sveVoznje);
}