import React, { Component } from 'react';
import {VoznjaComp} from './VoznjaComp.js';
import {Voznja} from './Voznja.js';
import {DataScroller} from 'primereact/datascroller';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Calendar} from 'primereact/calendar';
import {fetchLib} from './fetchLib';
import "../css/Search.css";

export class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			forma: {
				od: '',
				do: '',
				datum: '',
				cena: ''
			},
			voznje: [],
			rows: 0
		}

		this.srb = {
            firstDayOfWeek: 1,
            dayNames: ["nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota"],
            dayNamesShort: ["ned", "pon", "uto", "sre", "čet", "pet", "sub"],
            dayNamesMin: ["NED", "PON", "UTO", "SRE", "ČET", "PET", "SUB"],
            monthNames: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"]
        }

		this.itemTemplate = this.itemTemplate.bind(this);
		this.posalji = this.posalji.bind(this); 
	}

	componentDidMount() {
		let promise = fetchLib.getSveVoznje();
        promise.then(odgovorJSON => {
			let voznjeArr = [];
            for (let i = odgovorJSON.length - 1; i >= 0; i--) {
				let voznjaObj = new Voznja();
				voznjaObj.idvoznja = odgovorJSON[i]['id'];
				voznjaObj.cena_puta = odgovorJSON[i]['cena_puta'];
				voznjaObj.broj_mesta = odgovorJSON[i]['broj_mesta'];
				voznjaObj.datum_polaska = odgovorJSON[i]['datum_polaska'];
				voznjaObj.mogucnost_prtljaga = (odgovorJSON[i]['mogucnost_prtljaga'] === '1' ? 'Da' : 'Ne');
				voznjaObj.polazna_lokacija = odgovorJSON[i]['polazna_lokacija'];
				voznjaObj.destinacija = odgovorJSON[i]['destinacija'];
				voznjaObj.dodatne_informacije = odgovorJSON[i]['dodatne_informacije'];
				voznjaObj.idVozaca = odgovorJSON[i]['idVozaca'];
				voznjaObj.statusUlogovanogKorisnika = odgovorJSON[i]['statusUlogovanogKorisnika'];
				voznjeArr.push(voznjaObj);
			}
			this.setState({rows: odgovorJSON.length});
			this.setState({voznje: voznjeArr});
        });	
	}

	posalji() {
		if (this.state.forma.od === '' && this.state.forma.do === '' && this.state.forma.datum === ''  && this.state.forma.cena === '') {
			this.props.poruka.show({severity: 'warn', summary: 'Obaveštenje', detail: 'Morate popuniti bar jedno polje.'});
			return -1;
		}

		console.log(this.state);

		let fullDate = this.state.forma.datum;
		if (this.state.forma.datum instanceof Date) {
			let dd = this.state.forma.datum.getDate();
			let mm = this.state.forma.datum.getMonth() + 1;
			let yyyy = this.state.forma.datum.getFullYear();
			fullDate = [(dd > 9 ? '' : '0') + dd, (mm > 9 ? '' : '0') + mm, yyyy].join('-');
		}
		
		let sendForma = {
			od: this.state.forma.od,
			do: this.state.forma.do,
			datum: fullDate,
			cena: this.state.forma.cena
		}

		let promise = fetchLib.getFilteredVoznje(sendForma);
        promise.then(odgovorJSON => {
			let voznjeArr = [];
            for (let i = odgovorJSON.length - 1; i >= 0; i--) {
				let voznjaObj = new Voznja();
				voznjaObj.idvoznja = odgovorJSON[i]['id'];
				voznjaObj.cena_puta = odgovorJSON[i]['cena_puta'];
				voznjaObj.broj_mesta = odgovorJSON[i]['broj_mesta'];
				voznjaObj.datum_polaska = odgovorJSON[i]['datum_polaska'];
				voznjaObj.mogucnost_prtljaga = (odgovorJSON[i]['mogucnost_prtljaga'] === '1' ? 'Da' : 'Ne');
				voznjaObj.polazna_lokacija = odgovorJSON[i]['polazna_lokacija'];
				voznjaObj.destinacija = odgovorJSON[i]['destinacija'];
				voznjaObj.dodatne_informacije = odgovorJSON[i]['dodatne_informacije'];
				voznjaObj.idVozaca = odgovorJSON[i]['idVozaca'];
				voznjaObj.statusUlogovanogKorisnika = odgovorJSON[i]['statusUlogovanogKorisnika'];
				voznjeArr.push(voznjaObj);
			}
			this.setState({rows: odgovorJSON.length});
			this.setState({voznje: voznjeArr});
        });	
	}

	itemTemplate(voznja) {
		return (
			<VoznjaComp voznjaObj={voznja} promeniPogled={this.props.promeniPogled} poruka={this.props.poruka}></VoznjaComp>
		);
	}

	render() {
		return (
			<div className="search-container">
				<div className="search-fieldset">
					<div className="search-podnaslov">
                        Pretraga vožnji
                    </div>
					<div className="search-filter-form">
						<div className="search-header">
							<div className="p-float-label search-filter">
								<InputText id="search-od" value={this.state.forma.od} onChange={(e) => this.setState({forma: {...this.state.forma, od: e.target.value}})} />
								<label htmlFor="search-od">Od</label>
							</div>
							<div className="p-float-label search-filter">
								<InputText id="search-do" value={this.state.forma.do} onChange={(e) => this.setState({forma: {...this.state.forma, do: e.target.value}})} />
								<label htmlFor="search-do">Do</label>
							</div>
						</div>
						<div className="search-header">
							<div className="p-float-label search-filter">
								<Calendar required={true} id="voznja-add-datum" value={this.state.forma.datum} onChange={(e) => this.setState({forma: {...this.state.forma, datum: e.target.value}})} minDate={this.state.minDate} readonlyInput={true} locale={this.srb} dateFormat="dd-mm-yy"/>
								<label htmlFor="search-datum">Datum polaska</label>
							</div>
							<div className="p-float-label search-filter">
								<InputText keyfilter="int" id="search-cena" value={this.state.forma.cena} onChange={(e) => this.setState({forma: {...this.state.forma, cena: e.target.value}})} />
								<label htmlFor="search-cena">Max cena (RSD)</label>
							</div>
						</div>
						<div className="search-header">
							<Button label="Primeni" onClick={this.posalji}></Button>
						</div>
					</div>
					<DataScroller scrollHeight={700} lazy={true} inline={true} value={this.state.voznje} itemTemplate={this.itemTemplate} rows={this.state.rows}/>
				</div>
			</div>
		);
	}
}