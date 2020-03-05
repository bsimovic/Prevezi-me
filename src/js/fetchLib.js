
export class fetchLib {
    static register(obj) {
        let podaci = new FormData();
        podaci.append("ime", obj.ime);
        podaci.append("prezime", obj.prezime);
        podaci.append("godinaRodjenja", obj.godina_rodjenja);
        podaci.append("godineIskustva", obj.godine_iskustva);
        podaci.append("pol", obj.pol);
        podaci.append("lozinka", obj.lozinka);
        podaci.append("email", obj.email)
        podaci.append("brojTelefona", obj.broj_telefona);
        podaci.append("username", obj.username);
        podaci.append("rating", obj.rating);
        podaci.append("admin", obj.admin);
    
        let forma = {
            method: "POST",
            body: podaci
        };
    
        return fetch("php/KorisnickeOperacije/registracijaKorisnika.php", forma)
        .then(odgovor => odgovor.json());
    }

    static login(obj) {
        let podaci = new FormData();
        podaci.append("username", obj.username);
        podaci.append("lozinka", obj.lozinka);

        let forma = {
            method: "POST",
            body: podaci
        };
    
        return fetch("php/KorisnickeOperacije/prijaviKorisnika.php", forma)
        .then(odgovor => odgovor.json());
    }

    static logged() {
        let forma = {
            method: "POST"
        }

        return fetch("php/KorisnickeOperacije/proveraUlogovanogKorisnika.php", forma)
        .then(odgovor => odgovor.json());
    }

    static signout() {
        let forma = {
            method: "POST"
        }

        return fetch("php/KorisnickeOperacije/odjaviKorisnika.php", forma);
    }

    static izmeniKorisnika(obj) {
        let podaci = new FormData();
        podaci.append("novoIskustvo", obj.godine_iskustva);
        podaci.append("novaLozinka", obj.lozinka);
        podaci.append("novEmail", obj.email);
        podaci.append("noviBrojTelefona", obj.broj_telefona);

        let forma = {
            method: "POST",
            body: podaci
        };
    
        return fetch("php/KorisnickeOperacije/izmenaKorisnika.php", forma)
        .then(odgovor => odgovor.json());
    }

    static getKorisnik(id) {
        let podaci = new FormData();
        podaci.append("idkorisnika", id);

        let forma = {
            method: "POST",
            body: podaci
        };

        return fetch("php/KorisnickeOperacije/vratiKorisnikaPoIDu.php", forma)
        .then(odgovor => odgovor.json());
    }

    static addVoznja(obj) {
        let podaci = new FormData();
        podaci.append("cena_puta", obj.cena_puta);
        podaci.append("broj_mesta", obj.broj_mesta);
        podaci.append("mogucnost_prtljaga", obj.mogucnost_prtljaga);
        podaci.append("polazna_lokacija", obj.polazna_lokacija);
        podaci.append("destinacija", obj.destinacija);
        podaci.append("datum_polaska", obj.datum_polaska);
        podaci.append("dodatne_informacije", obj.dodatne_informacije)
    
        let forma = {
            method: "POST",
            body: podaci
        };
    
        return fetch("php/VoznjaOperacije/dodajVoznju.php", forma);
    }

    static getSveVoznje() {
        let forma = {
            method: "POST"
        };

        return fetch("php/VoznjaOperacije/vratiSveVoznje.php", forma)
        .then(odgovor => odgovor.json());
    }

    static getFilteredVoznje(obj) {
        let podaci = new FormData();
        if (obj.od !== '')
            podaci.append("polazna_lokacija", obj.od);
        if (obj.do !== '')
            podaci.append("destinacija", obj.do);
        if (obj.datum !== '')
            podaci.append("datum_polaska", obj.datum);
        if (obj.cena !== '')
            podaci.append("cena_puta", obj.cena);
    
        let forma = {
            method: "POST",
            body: podaci
        };
    
        return fetch("php/VoznjaOperacije/vratiSveFiltriraneVoznje.php", forma)
        .then(odgovor => odgovor.json());
    }

    static prijaviMe(id) {
        let podaci = new FormData();
        podaci.append("voznjaId", id);
    
        let forma = {
            method: "POST",
            body: podaci
        };
    
        return fetch("php/KorisnickeOperacije/prijaviMeNaVoznju.php", forma)
        .then(odgovor => odgovor.json());
    }

    static odjaviMe(id) {
        let podaci = new FormData();
        podaci.append("voznjaId", id);
    
        let forma = {
            method: "POST",
            body: podaci
        };
    
        return fetch("php/KorisnickeOperacije/odjaviMeSaVoznje.php", forma);
    }

    static obrisiKorisnika(username) {
        let podaci = new FormData();
        podaci.append("username", username);
    
        let forma = {
            method: "POST",
            body: podaci
        };
    
        return fetch("php/KorisnickeOperacije/brisanjeKorisnika.php", forma)
        .then(odgovor => odgovor.json());
    }

    static obrisiVoznju(idvoznja) {
        let podaci = new FormData();
        podaci.append("idvoznja", idvoznja);
    
        let forma = {
            method: "POST",
            body: podaci
        };
    
        return fetch("php/VoznjaOperacije/brisiVoznju.php", forma)
        .then(odgovor => odgovor.json());
    }

    static dodeliAdmina(id) {
        let podaci = new FormData();
        podaci.append("IdNovogAdmina", id);
    
        let forma = {
            method: "POST",
            body: podaci
        };
    
        return fetch("php/KorisnickeOperacije/dodeliAdmina.php", forma);
    }

    static getPutnike(idvoznja) {
        let podaci = new FormData();
        podaci.append("idVoznje", idvoznja);
    
        let forma = {
            method: "POST",
            body: podaci
        };
    
        return fetch("php/VoznjaOperacije/vratiPutnikeNaVoznji.php", forma)
        .then(odgovor => odgovor.json());
    }

    static izmeniVoznju(idvoznje, noviBrojMesta, noveInformacije) {
        let podaci = new FormData();
        podaci.append("idVoznje", idvoznje);
        podaci.append("noviBrojMesta", noviBrojMesta);
        podaci.append("noveInformacije", noveInformacije);
    
        let forma = {
            method: "POST",
            body: podaci
        };
    
        return fetch("php/VoznjaOperacije/izmenaVoznje.php", forma);
    }

    static oceni(idkorisnika, ocena) {
        let podaci = new FormData();
        podaci.append("idKorisnikaD", idkorisnika);
        podaci.append("ocena", ocena);
    
        let forma = {
            method: "POST",
            body: podaci
        };
    
        return fetch("php/KorisnickeOperacije/oceniVozaca.php", forma)
        .then(odgovor => odgovor.json());
    }
}
