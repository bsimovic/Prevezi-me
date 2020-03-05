import React, { Component } from 'react';
import {Fieldset} from 'primereact/fieldset';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {fetchLib} from './fetchLib';
import "../css/Admin.css";

export class Admin extends Component {
	constructor(props) {
        super(props);

        this.obavesti = this.obavesti.bind(this);
        this.izbrisiKorisnikaClick = this.izbrisiKorisnikaClick.bind(this);
        this.izbrisiVoznjuClick = this.izbrisiVoznjuClick.bind(this);
        this.dodeliAdmina = this.dodeliAdmina.bind(this);
        
        this.state = {
            usernameObrisi: '',
            voznjaid: '',
            idDodeliAdmina: ''
        }
    }

    obavesti(tip) {
		switch(tip) {
			case 'greskaUsername':
				this.props.poruka.show({severity: 'error', summary: 'Greška', detail: 'Korisničko ime ne postoji.'});
				break;
			case 'uspeh':
				this.props.poruka.show({severity: 'success', summary: 'Uspeh', detail: 'Operacija uspešna.'});
				break;
			default:
				break;
		}
	}
    
    izbrisiKorisnikaClick() {
        let promise = fetchLib.obrisiKorisnika(this.state.usernameObrisi);
		promise.then(odgovorJSON => {
			if (odgovorJSON['javilaSeGreska'] === 'true') {
				this.obavesti('greskaUsername');
			}
			else {
				this.obavesti('uspeh');
            }
		});	
    }

    izbrisiVoznjuClick() {
        let promise = fetchLib.obrisiVoznju(this.state.voznjaid);
		promise.then(odgovorJSON => {
			this.obavesti('uspeh');
		});	
    }

    dodeliAdmina() {
        let promise = fetchLib.dodeliAdmina(this.state.idDodeliAdmina);
		promise.then(odgovorJSON => {
			this.obavesti('uspeh');
            console.log(odgovorJSON);
        });	
    }

	render() {
		return (
			<div className="admin-container">
				<Fieldset className="admin-fieldset">
                    <div className="admin-podnaslov">
                        Admin panel
                    </div>
                    <div className="admin-form">
                        <div className="p-float-label admin-input">
                            <InputText id="admin-username" value={this.state.usernameObrisi} onChange={(e) => this.setState({usernameObrisi: e.target.value})} />
                            <label htmlFor="admin-username">Korisničko ime</label>
                        </div>
                        <div className="admin-button">
                            <Button className="p-button-danger" label="Obriši korisnika" onClick={this.izbrisiKorisnikaClick}></Button>
                        </div>
                        <div className="p-float-label">
                            <InputText className="admin-input" id="admin-voznja" value={this.state.voznjaid} onChange={(e) => this.setState({voznjaid: e.target.value})} />
                            <label htmlFor="admin-voznja">ID vožnje</label>
                        </div>
                        <div className="admin-button">
                            <Button className="admin-button p-button-danger" label="Obriši vožnju" onClick={this.izbrisiVoznjuClick}></Button>
                        </div>
                        <div className="p-float-label">
                            <InputText className="admin-input" id="admin-voznja" value={this.state.idDodeliAdmina} onChange={(e) => this.setState({idDodeliAdmina: e.target.value})} />
                            <label htmlFor="admin-voznja">ID Korisnika</label>
                        </div>
                        <div className="admin-button">
                            <Button className="admin-button p-button-warning" label="Dodeli admina" onClick={this.dodeliAdmina}></Button>
                        </div>
                    </div>
				</Fieldset>
			</div>
		);
	}
}