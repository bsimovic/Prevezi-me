<?php

interface IRadSaBazom
{
    //id i rating fale, mada rating mislim da treba biti 0, a id se sam generise...
    function dodajNovogKorisnika($ime, $prezime, $godinaRodjenja, $godineIskustva, $pol, $lozinka, $email, $brojTelefona, $username, $rating, $admin);
    function azurirajKorisnika($stariUsername, $noveGodineIskustva, $novaLozinka, $novEmail, $noviBrojTelefona);
    function obrisiKorisnika($usernameKojiSeBrise);
    function vratiKorisnika($username);//nek bude da vracam na osnovu username-a
    
   //realizacija voznje
    function dodajNovuVoznju($cena_puta, $broj_mesta, $mogucnost_prtljaga, $polaznaLokacija, $destinacija, $datumPolaska, $dodatneInformacije);
    function azurirajVoznju($idVoznjeKojaSeMenja, $noviBrojMesta, $noveInformacije);
    function ukloniVoznju($idVoznjeKojaSeBrise);
    
    // spajanje voznje i korisnika
    function dodajNovuVoznjuKorisniku($voznjaId, $korisnikId, $statusKorisnikaUVoznji);//status je 1 ako je korisnik vozac, inace je 0 (boolean u tabeli)
   // function azurirajVoznjeKorisnika(); -- funkcija azuriranje voznje korisnika nije potrebna posto tu nema sta mnogo da se promeni, jedino da se izbrise neki putnik ukoliko zeli da otkaze voznju ? 
    function ukloniVoznjuKorisniku($idVoznjeKojaSeBrise,$idKorisnikaKojiSeBrise); //uklanjam korisnika iz voznje, ili obrnuto...
    
    //dodavanje ocene
    
    function dodajOcenu();
}
