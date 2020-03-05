import React, { Component } from 'react';
import {Accordion, AccordionTab} from 'primereact/accordion';
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import {fetchLib} from './fetchLib';
import "../css/VoznjaComp.css";

export class VoznjaComp extends Component {
	constructor(props) {
        super(props);
  
        this.prijaviClick = this.prijaviClick.bind(this);
        this.odjaviClick = this.odjaviClick.bind(this);
        this.izmeniClick = this.izmeniClick.bind(this);
        this.profileClick = this.profileClick.bind(this);

        this.buttonPrijavi = <Button className="voznja-comp-dugme p-button-rounded p-button-success" label="Prijavi me" onClick={this.prijaviClick}></Button>;
        this.buttonOdjavi = <Button className="voznja-comp-dugme p-button-rounded p-button-danger" label="Odjavi me" onClick={this.odjaviClick}></Button>;
        this.buttonIzmeni = <Button className="voznja-comp-dugme p-button-rounded" label="Izmeni" onClick={this.izmeniClick}></Button>;

        this.state = {
            korisnikid: '',
            korisnikime: '',
            korisnikprezime: '',
            korisnikocena: '',
            korisnikemail: '',
            status: this.props.voznjaObj.statusUlogovanogKorisnika,
            dugme: this.buttonPrijavi,
            broj_mesta: this.props.voznjaObj.broj_mesta
        }
    }
    
    componentWillMount() {
        if (this.state.status === '-1')
            this.setState({dugme: this.buttonPrijavi});
        else if (this.state.status === '0')
            this.setState({dugme: this.buttonOdjavi});
        else if (this.state.status === '1')
            this.setState({dugme: this.buttonIzmeni});

        let promise = fetchLib.getKorisnik(this.props.voznjaObj.idVozaca);
		promise.then(odgovorJSON => {
            this.setState({korisnikid: odgovorJSON['idkorisnik']});
            this.setState({korisnikime: odgovorJSON['ime']});
            this.setState({korisnikprezime: odgovorJSON['prezime']});
            this.setState({korisnikbroj: odgovorJSON['brojTelefona']});
            this.setState({korisnikemail: odgovorJSON['email']});
		});
    }

    prijaviClick() {
        let promise = fetchLib.prijaviMe(this.props.voznjaObj.idvoznja);
        promise.then(odgovorJSON => {
            if (odgovorJSON['nemaMesta'] === 'true') {
                this.props.poruka.show({severity: 'error', summary: 'Greška', detail: 'Na toj vožnji nema slobodnih mesta.'});
            }
            else {
                this.props.poruka.show({sticky: true, severity: 'success', summary: 'Uspeh', detail: 'Uspešno ste se prijavili na vožnju, kontaktirajte vozača u vezi detalja.'});
                this.setState({status: 0});
                this.setState({dugme: this.buttonOdjavi});
                this.setState({broj_mesta: this.state.broj_mesta - 1});
            }
        });
    }

    odjaviClick() {
        let promise = fetchLib.odjaviMe(this.props.voznjaObj.idvoznja);
        promise.then(odgovorJSON => {
            this.props.poruka.show({sticky: true, severity: 'info', summary: 'Odjava', detail: 'Uspešno ste se odjavili sa vožnje, molimo vas obavestite vozača.'});
            this.setState({status: -1});
            this.setState({dugme: this.buttonPrijavi});
            this.setState({broj_mesta: this.state.broj_mesta + 1});
        });
    }

    izmeniClick() {
        this.props.promeniPogled('voznja-edit', 0, this.props.voznjaObj.idvoznja);
    }

    profileClick() {
        this.props.promeniPogled('profile', this.state.korisnikid);
    }

	render() {
		return (
			<Card className="voznja-comp-container">
                <div className="voznja-comp-id">
                    id: {this.props.voznjaObj.idvoznja}
                </div>
                <div className="voznja-comp-vozac">
                    Vozač: <span className="voznja-comp-link" onClick={this.profileClick}>{this.state.korisnikime} {this.state.korisnikprezime}</span>
                </div>
                <div className="voznja-comp-vozac">
                    Broj telefona: {this.state.korisnikbroj}
                </div>
                <div className="voznja-comp-vozac">
                    E-Mail: {this.state.korisnikemail}
                </div>
                <div className="voznja-comp-srcdst">
                    <div>{this.props.voznjaObj.polazna_lokacija}</div>
                    <div>—</div>
                    <div>{this.props.voznjaObj.destinacija}</div>
                </div>
                <div className="voznja-comp-bottom">
                    <div className="voznja-comp-pod">
                        <div>Cena puta:</div>
                        <div>{this.props.voznjaObj.cena_puta}</div>
                    </div>
                    <div className="voznja-comp-pod">
                        <div>Broj slobodnih mesta:</div>
                        <div>{this.state.broj_mesta}</div>
                    </div>
                    <div className="voznja-comp-pod">
                        <div>Datum polaska:</div>
                        <div>{this.props.voznjaObj.datum_polaska}</div>
                    </div>
                    <div className="voznja-comp-pod">
                        <div>Mogućnost prtljaga:</div>
                        <div>{this.props.voznjaObj.mogucnost_prtljaga}</div>
                    </div>
                </div>
                <div className="voznja-comp-bottombottom">
                    <Accordion>
                        <AccordionTab header="Dodatne informacije">
                            <div className="voznja-comp-dodatne">
                                {this.props.voznjaObj.dodatne_informacije}
                            </div>
                        </AccordionTab>
                    </Accordion>
                    <div className="voznja-comp-button">
                        {this.state.dugme}
                    </div>
                </div>
			</Card>
		);
	}
}