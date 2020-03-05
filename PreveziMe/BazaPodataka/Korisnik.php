<?php

class Korisnik
{
    private $id;
    private $ime;
    private $prezime;
    private $godinaRodjenja;
    private $godineIskustva;
    private $pol;
    private $lozinka;
    private $email;
    private $brojTelefona;
    private $username;
    private $rating;
    private $admin;
    
    public function __construct($id, $ime, $prezime, $godina_rodjenja, $godine_iskustva, $pol, $lozinka, $email, $broj_telefona, $username, $rating, $admin)
    {
        $this->id = $id;
        $this->ime = $ime;
        $this->prezime = $prezime;
        $this->godinaRodjenja = $godina_rodjenja;
        $this->godineIskustva = $godine_iskustva;
        $this->pol = $pol;
        $this->lozinka = $lozinka;
        $this->email = $email;
        $this->brojTelefona = $broj_telefona;
        $this->username = $username;
        $this->rating = $rating;
        $this->admin = $admin;
    }
    public function getId() {
        return $this->id;
    }

    public function getIme() {
        return $this->ime;
    }

    public function getPrezime() {
        return $this->prezime;
    }

    public function getGodinaRodjenja() {
        return $this->godinaRodjenja;
    }

    public function getGodineIskustva() {
        return $this->godineIskustva;
    }

    public function getPol() {
        return $this->pol;
    }

    public function getLozinka() {
        return $this->lozinka;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getBrojTelefona() {
        return $this->brojTelefona;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getRating() {
        return $this->rating;
    }

    public function getAdmin() {
        return $this->admin;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setIme($ime) {
        $this->ime = $ime;
    }

    public function setPrezime($prezime) {
        $this->prezime = $prezime;
    }

    public function setGodinaRodjenja($godinaRodjenja) {
        $this->godinaRodjenja = $godinaRodjenja;
    }

    public function setGodineIskustva($godineIskustva) {
        $this->godineIskustva = $godineIskustva;
    }

    public function setPol($pol) {
        $this->pol = $pol;
    }

    public function setLozinka($lozinka) {
        $this->lozinka = $lozinka;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setBrojTelefona($brojTelefona) {
        $this->brojTelefona = $brojTelefona;
    }

    public function setUsername($username) {
        $this->username = $username;
    }

    public function setRating($rating) {
        $this->rating = $rating;
    }

    public function setAdmin($admin) {
        $this->admin = $admin;
    }


}
