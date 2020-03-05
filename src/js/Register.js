import React, { Component } from 'react';
import {Fieldset} from 'primereact/fieldset';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {SelectButton} from 'primereact/selectbutton';
import {Button} from 'primereact/button';
import {fetchLib} from './fetchLib.js';
import {Loading} from './Loading.js';
import "../css/Register.css";

export class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			forma: {
				ime: '',
				prezime: '',
				godina_rodjenja: '',
				godine_iskustva: '',
				pol: '',
				lozinka: '',
				email: '',
				broj_telefona: '',
				username: ''
			},
			potvrdi: '',
			loading: false

		}

		this.posalji = this.posalji.bind(this);
		this.obavesti = this.obavesti.bind(this);

	}

	obavesti(tip) {
		switch(tip) {
			case 'greskaUsername':
				this.props.poruka.show({severity: 'error', summary: 'Greška', detail: 'Korisničko ime je zauzeto.'});
				break;
			case 'uspeh':
				this.props.poruka.show({severity: 'success', summary: 'Uspeh', detail: 'Registracija uspešna.'});
				break;
			case 'greskaPolja':
				this.props.poruka.show({severity: 'error', summary: 'Greška', detail: 'Sva polja moraju biti popunjena.'});
				break;
			case 'greskaLozinke':
				this.props.poruka.show({severity: 'error', summary: 'Greška', detail: 'Lozinke se ne poklapaju.'});
				break;
			default:
				break;
		}
	}

	posalji() {
        for (var i in this.state.forma) {
            if (this.state.forma.hasOwnProperty(i) && this.state.forma[i] === "") {
                this.obavesti('greskaPolja');
                return -1;
            }
		}
		
		if (this.state.forma.lozinka !== this.state.potvrdi) {
			this.obavesti('greskaLozinke');
			return -1;
		}
		
		let promise = fetchLib.register(this.state.forma);
		promise.then(odgovorJSON => {
			this.setState({loading: true});
			if (odgovorJSON['javilaSeGreska'] === 'true') {
				this.obavesti('greskaUsername');
				this.setState({loading: false});
			}
			else {
				this.obavesti('uspeh');
				this.setState({loading: false});
				this.props.promeniPogled('login');
			}
		});	
	}

	render() {
		const pol = [
			{label: 'Muško', value: 'm'},
			{label: 'Žensko', value: 'z'}
		];

		if (this.state.loading) {
			return (
				<div>
					<Loading></Loading>
				</div>
			);
		}
		else {
			return (
				<div className="register-container">
					<Fieldset className="register-fieldset">
						<div className="register-podnaslov">
							Registracija
						</div>
						<div className="register-forma">
							<div className="p-float-label">
								<InputText id="register-ime" className="register-field" value={this.state.forma.ime} onChange={(e) => this.setState({forma: {...this.state.forma, ime: e.target.value}})} />
								<label htmlFor="register-ime">Ime</label>
							</div>
							<div className="p-float-label">
								<InputText id="register-prezime" className="register-field" value={this.state.forma.prezime} onChange={(e) => this.setState({forma: {...this.state.forma, prezime: e.target.value}})} />
								<label htmlFor="register-prezime">Prezime</label>
							</div>
							<div className="p-float-label">
								<InputText id="register-godrodj" className="register-field" value={this.state.forma.godina_rodjenja} onChange={(e) => this.setState({forma: {...this.state.forma, godina_rodjenja: e.target.value}})} keyfilter="int"/>
								<label htmlFor="register-godrodj">Godina rođenja</label>
							</div>
							<div className="p-float-label">
								<InputText id="register-godisk" className="register-field" value={this.state.forma.godine_iskustva} onChange={(e) => this.setState({forma: {...this.state.forma, godine_iskustva: e.target.value}})} keyfilter="int"/>
								<label htmlFor="register-godisk">Godine iskustva</label>
							</div>
							<div className="p-float-label">
								<SelectButton className="register-field" value={this.state.forma.pol} options={pol} onChange={(e) => this.setState({forma: {...this.state.forma, pol: e.target.value}})} />
							</div>
							<div className="p-float-label">
								<Password id="register-lozinka" className="register-field" value={this.state.forma.lozinka} onChange={(e) => this.setState({forma: {...this.state.forma, lozinka: e.target.value}})} promptLabel="Unesite lozinku" weakLabel="Slabo" mediumLabel="Srednje" strongLabel="Jako" />
								<label htmlFor="register-lozinka">Lozinka</label>
							</div>
							<div className="p-float-label">
								<Password id="register-lozinkapotvr" className="register-field" value={this.state.potvrdi} onChange={(e) => this.setState({potvrdi: e.target.value})} promptLabel="Unesite lozinku" weakLabel="Slabo" mediumLabel="Srednje" strongLabel="Jako" feedback={false} />
								<label htmlFor="register-lozinkapotvr">Potvrdi lozinku</label>
							</div>
							<div className="p-float-label">
								<InputText id="register-email" className="register-field" value={this.state.forma.email} onChange={(e) => this.setState({forma: {...this.state.forma, email: e.target.value}})} />
								<label htmlFor="register-email">E-Mail</label>
							</div>
							<div className="p-float-label">
								<InputText id="register-brojtel" className="register-field" value={this.state.forma.broj_telefona} onChange={(e) => this.setState({forma: {...this.state.forma, broj_telefona: e.target.value}})} keyfilter="int"/>
								<label htmlFor="register-brojtel">Broj telefona</label>
							</div>
							<div className="p-float-label">
								<InputText id="register-username" className="register-field" value={this.state.forma.username} onChange={(e) => this.setState({forma: {...this.state.forma, username: e.target.value}})} />
								<label htmlFor="register-username">Korisničko ime</label>
							</div>
							<div className="p-float-label">
								<Button label="Potvrdi" className="register-field p-button-success" onClick={this.posalji}></Button>
							</div>
						</div>
					</Fieldset>
				</div>
			);
		}
	}
}