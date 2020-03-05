import React, { Component } from 'react';
import {Fieldset} from 'primereact/fieldset';
import {InputText} from 'primereact/inputtext';
import {Checkbox} from 'primereact/checkbox';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Calendar} from 'primereact/calendar';
import {fetchLib} from './fetchLib';
import "../css/VoznjaAdd.css";

export class VoznjaAdd extends Component {
	constructor(props) {
        super(props);

        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
		this.state = {
            forma: {
			    cena_puta: '',
			    broj_mesta: '',
                datum_polaska: new Date(),
                mogucnost_prtljaga: false,
                polazna_lokacija: '',
                destinacija: '',
                dodatne_informacije: ''
            },
            minDate: yesterday,
		}

        this.posalji = this.posalji.bind(this);

        this.srb = {
            firstDayOfWeek: 1,
            dayNames: ["nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota"],
            dayNamesShort: ["ned", "pon", "uto", "sre", "čet", "pet", "sub"],
            dayNamesMin: ["NED", "PON", "UTO", "SRE", "ČET", "PET", "SUB"],
            monthNames: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"]

        }
    }
    
    obavesti(tip) {
		switch(tip) {
			case 'uspeh':
				this.props.poruka.show({severity: 'success', summary: 'Uspeh', detail: 'Vožnja uspešno dodata.'});
				break;
			case 'greskaPolja':
				this.props.poruka.show({severity: 'error', summary: 'Greška', detail: 'Sva polja osim dodatnih infomacija moraju biti popunjena.'});
				break;
			default:
				break;
		}
	}

	posalji() {
        
        if (this.state.forma.cena_puta === '' || this.state.forma.broj_mesta === '' || this.state.forma.polazna_lokacija === '' || this.state.forma.destinacija === '' || this.state.forma.datum_polaska === undefined || this.state.forma.datum_polaska === null) {
            this.obavesti('greskaPolja');
            return -1;
        }

        let sendForma = this.state.forma;
        sendForma.mogucnost_prtljaga = (this.state.forma.mogucnost_prtljaga ? 1 : 0);

        let dd = this.state.forma.datum_polaska.getDate();
        let mm = this.state.forma.datum_polaska.getMonth() + 1;
        let yyyy = this.state.forma.datum_polaska.getFullYear();
        sendForma.datum_polaska = [(dd > 9 ? '' : '0') + dd, (mm > 9 ? '' : '0') + mm, yyyy].join('-');

        let promise = fetchLib.addVoznja(sendForma);
        promise.then(odgovorJSON => {
            this.obavesti('uspeh');
            this.props.promeniPogled('search');
        });	
	}

	render() {
        return (
            <div className="voznja-add-container">
                <Fieldset className="voznja-add-fieldset">
                        <div className="voznja-add-podnaslov">
                            Dodavanje nove vožnje
                        </div>

                        <div className="voznja-add-forma">
                            <div className="voznja-add-podpodnaslov">
                                Polazno mesto i destinacija:
                            </div>

                            <div className="voznja-add-forma-cont">
                                <InputText className="voznja-add-field polazno-destinacija" value={this.state.forma.polazna_lokacija} onChange={(e) => this.setState({forma: {...this.state.forma, polazna_lokacija: e.target.value}})} />
                                <div className="polazno-destinacija-dash">—</div>
                                <InputText className="voznja-add-field polazno-destinacija" value={this.state.forma.destinacija} onChange={(e) => this.setState({forma: {...this.state.forma, destinacija: e.target.value}})} />
                            </div>

                            <div className="voznja-add-podpodnaslov">
                                Informacije o prevozu:
                            </div>

                            <div className="p-float-label">
                                <span>Datum polaska:</span>
                                <Calendar required={true} id="voznja-add-datum" value={this.state.forma.datum_polaska} onChange={(e) => this.setState({forma: {...this.state.forma, datum_polaska: e.target.value}})} minDate={this.state.minDate} readonlyInput={true} inline={true} locale={this.srb} dateFormat="dd-mm-yy"/>
                            </div>
                            
                            <div className="p-float-label">
                                <InputText keyfilter="int" id="voznja-add-cenaputa" className="voznja-add-field" value={this.state.forma.cena_puta} onChange={(e) => this.setState({forma: {...this.state.forma, cena_puta: e.target.value}})} />
                                <label htmlFor="voznja-add-cenaputa">Ukupna cena puta u RSD</label>
                            </div>

                            <div className="p-float-label">
                                <InputText keyfilter="int" id="voznja-add-brojmesta" className="voznja-add-field" value={this.state.forma.broj_mesta} onChange={(e) => this.setState({forma: {...this.state.forma, broj_mesta: e.target.value}})} />
                                <label htmlFor="voznja-add-brojmesta">Broj slobodnih mesta</label>
                            </div>

                            <div className="voznja-add-prtljag-div">
                                <Checkbox checked={this.state.forma.mogucnost_prtljaga} onChange={(e) => this.setState({forma: {...this.state.forma, mogucnost_prtljaga: e.checked}})}></Checkbox>
                                <span className="voznja-add-prtljag">Mogućnost prevoza prtljaga</span>
                            </div>

                            <div className="voznja-add-podpodnaslov">
                                Dodatne informacije:
                            </div>

                            <div className="p-float-label">
                                <InputTextarea rows={5} cols={30} value={this.state.forma.dodatne_informacije} onChange={(e) => this.setState({forma: {...this.state.forma, dodatne_informacije: e.target.value}})} autoResize={true} />
                            </div>

                            <div className="p-float-label">
                                <Button label="Dodaj" className="voznja-add-field p-button-success" onClick={this.posalji}></Button>
                            </div>
                        </div>
                </Fieldset>
            </div>
        );
	}
}