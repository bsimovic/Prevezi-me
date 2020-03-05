CREATE DATABASE prevezi_me_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

----------KORISNIK----------
CREATE TABLE korisnik (
  idkorisnik int(11) NOT NULL,
  ime varchar(45) NOT NULL,
  prezime varchar(45) NOT NULL,
  godina_rodjenja int(11) NOT NULL,
  godine_iskustva int(11) NOT NULL,
  pol varchar(45) NOT NULL,
  lozinka varchar(45) NOT NULL,
  email varchar(45) NOT NULL,
  broj_telefona varchar(45) NOT NULL,
  username varchar(45) NOT NULL,
  rating double NOT NULL DEFAULT '0',
  admin int(11) NOT NULL,
  PRIMARY KEY (idkorisnik),
  UNIQUE KEY idkorisnik_UNIQUE (idkorisnik)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

----------VOZNJA----------
CREATE TABLE voznja (
  idvoznja int(11) NOT NULL,
  cena_puta varchar(45) NOT NULL,
  broj_mesta int(11) NOT NULL,
  datum_polaska varchar(45) NOT NULL,
  mogucnost_prtljaga int(11) NOT NULL,
  polazna_lokacija varchar(60) NOT NULL,
  destinacija varchar(45) NOT NULL,
  dodatne_informacije varchar(45) NOT NULL,
  PRIMARY KEY (idvoznja),
  UNIQUE KEY idvoznja_UNIQUE (idvoznja)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

----------VOZNJEKORISNIKA----------
CREATE TABLE voznjekorisnika (
  voznjaId int(11) NOT NULL,
  korisnikId int(11) NOT NULL,
  status int(11) NOT NULL, 
  PRIMARY KEY (voznjaId, korisnikId),
  KEY voznja_fk_idx (voznjaId),
  KEY korisnik_fk_idx (korisnikId),
  CONSTRAINT korisnik_fk FOREIGN KEY (korisnikId) REFERENCES korisnik (idkorisnik) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT voznja_fk FOREIGN KEY (voznjaId) REFERENCES voznja (idvoznja) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

----------OCENA----------
CREATE TABLE ocena (
 korisnikIdP int(11) NOT NULL,
 korisnikIdD int(11) NOT NULL,
 ocenakorisnika double NOT NULL,
 PRIMARY KEY (korisnikIdP,korisnikIdD),
 KEY korisnikp_fk_idx (korisnikIdP),
 KEY korisnikd_fk_idx (korisnikIdD),
 CONSTRAINT korisnikp_fk FOREIGN KEY (korisnikIdP) REFERENCES korisnik (idkorisnik) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT korisnikD_fk FOREIGN KEY (korisnikIdD) REFERENCES korisnik (idkorisnik) ON DELETE CASCADE ON UPDATE CASCADE,
) ENIGNE=InnoDB DEFAULT CHARSET=utf8;