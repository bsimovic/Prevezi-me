import React, { Component } from 'react';
import {Fieldset} from 'primereact/fieldset';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {Loading} from './Loading.js';
import {fetchLib} from './fetchLib';
import "../css/Login.css";

export class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
            forma: {
			    username: '',
			    lozinka: ''
			},
			loading: false
		}

		this.posalji = this.posalji.bind(this);
		this.obavesti = this.obavesti.bind(this);
	}

	obavesti(tip) {
		switch(tip) {
			case 'greskaUsername':
				this.props.poruka.show({severity: 'error', summary: 'Greška', detail: 'Korisničko ime ne postoji.'});
				break;
			case 'uspeh':
				this.props.poruka.show({severity: 'success', summary: 'Uspeh', detail: 'Uspešno ste se prijavili.'});
				break;
			case 'greskaPolja':
				this.props.poruka.show({severity: 'error', summary: 'Greška', detail: 'Sva polja moraju biti popunjena.'});
				break;
			case 'greskaLozinke':
				this.props.poruka.show({severity: 'error', summary: 'Greška', detail: 'Netačna lozinka.'});
				break;
			default:
				break;
		}
	}

	posalji() {
        for (var i in this.state.forma) {
            if (this.state.forma.hasOwnProperty(i) && this.state.forma[i] === "") {
                console.log(this.state)
                this.obavesti('greskaPolja');
                return -1;
            }
        }
		
		let promise = fetchLib.login(this.state.forma);
		promise.then(odgovorJSON => {
			this.setState({loading: true});
			if (odgovorJSON['javilaSeGreska'] === 'true') {
				if (odgovorJSON['usernameGreska'] === 'true')
					this.obavesti('greskaUsername');
				else if (odgovorJSON['passwordGreska'] === 'true')
					this.obavesti('greskaLozinke');
				this.setState({loading: false});
			}
			else {
				this.props.proveriLogged();
				this.setState({loading: false});
				this.props.promeniPogled('home');
				
			}

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
				<div className="login-container">
					<Fieldset className="login-fieldset">
							<div className="login-podnaslov">
								Login
							</div>
							<div className="login-forma">
								<div className="p-float-label">
									<InputText id="login-username" className="login-field" value={this.state.forma.username} onChange={(e) => this.setState({forma: {...this.state.forma, username: e.target.value}})} />
									<label htmlFor="login-username">Korisničko ime</label>
								</div>
								<div className="p-float-label">
									<Password id="login-lozinka" className="login-field" value={this.state.forma.lozinka} onChange={(e) => this.setState({forma: {...this.state.forma, lozinka: e.target.value}})} feedback={false} />
									<label htmlFor="login-lozinka">Lozinka</label>
								</div>
								<div className="p-float-label">
									<Button label="Potvrdi" className="login-field p-button-success" onClick={this.posalji}></Button>
								</div>
							</div>
					</Fieldset>
				</div>
			);
		}
	}
}