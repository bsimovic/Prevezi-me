import React, { Component } from 'react';
import {Fieldset} from 'primereact/fieldset';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {fetchLib} from './fetchLib';
import {DataScroller} from 'primereact/datascroller';
import {Korisnik} from './Korisnik.js';
import "../css/VoznjaEdit.css";

export class VoznjaEdit extends Component {
	constructor(props) {
        super(props);
        
		this.state = {
            forma: {
			    broj_mesta: '',
                dodatne_informacije: ''
            },
            korisnici: [],
            rows: 0
		}

        this.posalji = this.posalji.bind(this);
        this.obrisi = this.obrisi.bind(this);
        this.itemTemplate = this.itemTemplate.bind(this);
        this.profileClick = this.profileClick.bind(this);
    }
    
    obavesti(tip) {
		switch(tip) {
			case 'uspehDodavanje':
				this.props.poruka.show({severity: 'info', summary: 'Obaveštenje', detail: 'Vožnja uspešno izmenjena.'});
                break;
            case 'uspehBrisanje':
                this.props.poruka.show({severity: 'info', summary: 'Obaveštenje', detail: 'Vožnja uspešno obrisana.'});
                break;
			case 'greskaPolja':
				this.props.poruka.show({severity: 'error', summary: 'Greška', detail: 'Polje broj mesta mora biti popunjeno.'});
				break;
			default:
				break;
		}
    }
    
    componentWillMount() {
        let promise = fetchLib.getPutnike(this.props.voznjaId);
		promise.then(odgovorJSON => {
            console.log(odgovorJSON);
            let korisniciArr = [];
            for (let i = odgovorJSON.length - 1; i >= 0; i--) {
				let korisnikObj = new Korisnik();
				korisnikObj.idkorisnik = odgovorJSON[i]['idKorisnik'];
                korisnikObj.ime = odgovorJSON[i]['ime'];
                korisnikObj.prezime = odgovorJSON[i]['prezime'];
                korisnikObj.broj_telefona = odgovorJSON[i]['broj_telefona'];
				korisniciArr.push(korisnikObj);
            }
            console.log(korisniciArr);
			this.setState({rows: odgovorJSON.length});
			this.setState({korisnici: korisniciArr});
		});	
    }

	posalji() {     
        if (this.state.forma.broj_mesta === '') {
            this.obavesti('greskaPolja');
            return -1;
        }
        let promise = fetchLib.izmeniVoznju(this.props.voznjaId, this.state.forma.broj_mesta, this.state.forma.dodatne_informacije);
		promise.then(odgovorJSON => {
            this.obavesti('uspehDodavanje');
            this.props.promeniPogled('search');
		});
    }

    obrisi() {     
        let promise = fetchLib.obrisiVoznju(this.props.voznjaId);
		promise.then(odgovorJSON => {
            this.obavesti('uspehBrisanje');
            this.props.promeniPogled('search');
		});	
    }

    profileClick(id) {
        console.log(id);
        this.props.promeniPogled('profile', id);
    }
    
    itemTemplate(korisnik) {
		return (
			<span onClick={() => this.profileClick(korisnik.idkorisnik)}>{korisnik.ime} {korisnik.prezime} {korisnik.broj_telefona}</span>
		);
    }
    
	render() {
        return (
            <div className="voznja-edit-container">
                <Fieldset className="voznja-edit-fieldset">
                        <div className="voznja-edit-podnaslov">
                            Izmena vožnje
                        </div>
                        <div className="voznja-edit-forma">
                            <div className="voznja-edit-podpodnaslov">
                                Lista prijavljenih korisnika:
                            </div>
                            <DataScroller scrollHeight={600} lazy={true} inline={true} value={this.state.korisnici} itemTemplate={this.itemTemplate} rows={this.state.rows}/>
                            <div className="p-float-label">
                                <InputText keyfilter="int" id="voznja-edit-brojmesta" className="voznja-edit-field" value={this.state.forma.broj_mesta} onChange={(e) => this.setState({forma: {...this.state.forma, broj_mesta: e.target.value}})} />
                                <label htmlFor="voznja-edit-brojmesta">Broj slobodnih mesta</label>
                            </div>
                            <div className="voznja-edit-podpodnaslov">
                                Dodatne informacije:
                            </div>
                            <div className="p-float-label">
                                <InputTextarea rows={5} cols={30} value={this.state.forma.dodatne_informacije} onChange={(e) => this.setState({forma: {...this.state.forma, dodatne_informacije: e.target.value}})} autoResize={true} />
                            </div>
                            <div className="p-float-label">
                                <Button label="Izmeni" className="voznja-edit-field p-button-success" onClick={this.posalji}></Button>
                            </div>
                            <div className="p-float-label">
                                <Button label="Obriši" className="voznja-edit-field p-button-danger" onClick={this.obrisi}></Button>
                            </div>
                        </div>
                </Fieldset>
            </div>
        );
	}
}