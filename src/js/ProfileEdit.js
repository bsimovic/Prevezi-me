import React, { Component } from 'react';
import {Fieldset} from 'primereact/fieldset';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {Loading} from './Loading.js';
import {fetchLib} from './fetchLib';
import "../css/ProfileEdit.css";

export class ProfileEdit extends Component {
	constructor(props) {
        super(props);
       
		this.state = {
            forma: {
			    email: '',
			    lozinka: '',
                godine_iskustva: '',
                broj_telefona: ''
			},
			potvrdi: '',
			loading: false
		}

		this.posalji = this.posalji.bind(this);

	}

	componentWillMount() {
		console.log(this.props.korisnikId);
		let promise = fetchLib.getKorisnik(this.props.korisnikId);
		promise.then(odgovorJSON => {
            this.setState({loading: true});
            this.setState({forma: {
                godine_iskustva: odgovorJSON['godineIskustva'],
                email: odgovorJSON['email'],
                broj_telefona: odgovorJSON['brojTelefona'],
                lozinka: ''
			}});
			this.setState({potvrdi: odgovorJSON['lozinka']});

			this.setState({loading: false});
		});
	}

	obavesti(tip) {
		switch(tip) {
			case 'uspeh':
				this.props.poruka.show({severity: 'success', summary: 'Uspeh', detail: 'Izmena uspešna.'});
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
		
		let promise = fetchLib.izmeniKorisnika(this.state.forma);
		promise.then(odgovorJSON => {
			this.setState({loading: true});
			this.obavesti('uspeh');
			this.setState({loading: false});
			this.props.promeniPogled('search');
		});
	}

	render() {
		if (this.state.loading) {
			return (
				<div>
					<Loading></Loading>
				</div>
			);
		}
		else {
			return (
				<div className="profile-edit-container">
					<Fieldset className="profile-edit-fieldset">
							<div className="profile-edit-podnaslov">
								Izmena profila
							</div>
							<div className="profile-edit-forma">
								<div className="p-float-label">
									<InputText id="profile-edit-email" className="profile-edit-field" value={this.state.forma.email} onChange={(e) => this.setState({forma: {...this.state.forma, email: e.target.value}})} />
									<label htmlFor="profile-edit-email">E-mail</label>
								</div>
								<div className="p-float-label">
									<Password id="profile-edit-lozinka" className="profile-edit-field" value={this.state.forma.lozinka} onChange={(e) => this.setState({forma: {...this.state.forma, lozinka: e.target.value}})} />
									<label htmlFor="profile-edit-lozinka">Lozinka</label>
								</div>
								<div className="p-float-label">
									<Password id="profile-edit-potvrdi" className="profile-edit-field" value={this.state.potvrdi} onChange={(e) => this.setState({potvrdi: e.target.value})} feedback={false} />
									<label htmlFor="profile-edit-potvrdi">Potvrdi lozinku</label>
								</div>
								<div className="p-float-label">
									<InputText id="profile-edit-godineiskustva" className="profile-edit-field" value={this.state.forma.godine_iskustva} onChange={(e) => this.setState({forma: {...this.state.forma, godine_iskustva: e.target.value}})}></InputText>
									<label htmlFor="profile-edit-godineiskustva">Godine iskustva</label>
								</div>
								<div className="p-float-label">
									<InputText id="profile-edit-brojtelefona" className="profile-edit-field" value={this.state.forma.broj_telefona} onChange={(e) => this.setState({forma: {...this.state.forma, broj_telefona: e.target.value}})}></InputText>
									<label htmlFor="profile-edit-brojtelefona">Broj telefona</label>
								</div>
								<div className="p-float-label">
									<Button label="Sačuvaj" className="profile-edit-field p-button-success" onClick={this.posalji}></Button>
								</div>
							</div>
					</Fieldset>
				</div>
			);
		}
	}
}