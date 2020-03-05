import React, { Component } from 'react';
import {Fieldset} from 'primereact/fieldset';
import {Rating} from 'primereact/rating';
import {fetchLib} from './fetchLib';
import "../css/Profile.css";


export class Profile extends Component {
	constructor(props) {
        super(props);
        
        this.oceni = this.oceni.bind(this);

        this.state = {
            korisnik: {
                idkorisnik: '',
                ime: '',
                prezime: '',
                godina_rodjenja: '',
                godine_iskustva: '',
                pol: '',
                email: '',
                broj_telefona: '',
                rating: ''
            },
            myRating: null,
        };
    }

    componentWillMount() {
        let promise = fetchLib.getKorisnik(this.props.korisnikId);
		promise.then(odgovorJSON => {
            this.setState({korisnik: {
                idkorisnik: odgovorJSON['idkorisnik'],
                ime: odgovorJSON['ime'],
                prezime: odgovorJSON['prezime'],
                godina_rodjenja: odgovorJSON['godinaRodjenja'],
                godine_iskustva: odgovorJSON['godineIskustva'],
                pol: odgovorJSON['pol'],
                email: odgovorJSON['email'],
                broj_telefona: odgovorJSON['brojTelefona'],
                rating: odgovorJSON['rating']
            }});
		});
    }

    oceni(e) {
        this.setState({myRating: e.value});

        let promise = fetchLib.oceni(this.state.korisnik.idkorisnik, e.value);
		promise.then(odgovorJSON => {
            if (odgovorJSON === 0)
                this.props.poruka.show({severity: 'error', summary: 'Greška', detail: 'Ne možete oceniti sami sebe.'});
		});	
    }
    
	render() {
        return (
            <div className="profile-container">
                <Fieldset className="profile-fieldset">
                    <div className="profile-id">
                        id: {this.state.korisnik.idkorisnik}
                    </div>
                    <div className="profile-imeprezime">
                        {this.state.korisnik.ime} {this.state.korisnik.prezime}
                    </div>
                    <div className="profile-korisnik">
                        <div className="profile-podatak">
                            <div>Broj telefona:</div>
                            <div>{this.state.korisnik.broj_telefona}</div>
                        </div>
                        <div className="profile-podatak">
                            <div>E-mail:</div>
                            <div>{this.state.korisnik.email}</div>
                        </div>
                        <div className="profile-podatak">
                            <div>Godina rođenja:</div>
                            <div>{this.state.korisnik.godina_rodjenja}</div>
                        </div>
                        <div className="profile-podatak">
                            <div>Godine iskustva:</div>
                            <div>{this.state.korisnik.godine_iskustva}</div>
                        </div>
                        <div className="profile-podatak">
                            <div>Pol:</div>
                            <div>{(this.state.korisnik.pol === 'm' ? 'Muški' : 'Ženski')}</div>
                        </div>
                        <div className="profile-podatak">
                            <div>Ocena:</div>
                            <div id="profile-ocenadiv"><Rating style={{marginRight: 5}} value={this.state.korisnik.rating} cancel={false} readonly={true}></Rating> {this.state.korisnik.rating}</div>
                        </div>
                    </div>
                    <div className="profile-oceni">
                        <div>Oceni korisnika<Rating value={this.state.myRating} onChange={(e) => this.oceni(e)} cancel={false} disabled={this.statecurrUser}></Rating></div>
                    </div>
                </Fieldset>
            </div>
        );
	}
}