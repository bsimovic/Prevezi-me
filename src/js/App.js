import React, { Component } from 'react';
import { TopMenu } from './TopMenu.js';
import { Home } from './Home.js';
import { Register } from './Register.js';
import { Login } from './Login.js';
import { Profile } from './Profile.js'
import { ProfileEdit } from './ProfileEdit.js';
import { VoznjaAdd } from './VoznjaAdd.js';
import { Search } from './Search.js';
import { Growl } from 'primereact/growl';
import { VoznjaEdit } from './VoznjaEdit.js';
import { Loading } from './Loading.js';
import { fetchLib } from './fetchLib.js';
import { Admin } from './Admin.js';
import "../css/App.css";


class App extends Component {
	constructor(props) {
		super(props);

		this.promeniPogled = this.promeniPogled.bind(this);
		this.proveriLogged = this.proveriLogged.bind(this);
		this.odjavi = this.odjavi.bind(this);

		this.napraviMeni = function(logged, ime = '', admin = 0, id = -1) {
			return <TopMenu loggedin={logged} ime={ime} admin={admin} id={id} promeniPogled={this.promeniPogled} odjavi={this.odjavi}></TopMenu>;
		}
		
		this.napraviPogled = function(pogled, korisnikId, voznjaId) {
			let ret = undefined;
			switch (pogled) {
				case 'home':
					ret = <Home promeniPogled={this.promeniPogled}></Home>;
					break;
				case 'register':
					ret = <Register promeniPogled={this.promeniPogled} poruka={this.growl}></Register>;
					break;
				case 'login':
					ret = <Login promeniPogled={this.promeniPogled} poruka={this.growl} proveriLogged={this.proveriLogged}></Login>;
					break;
				case 'search':
					ret = <Search promeniPogled={this.promeniPogled} poruka={this.growl}></Search>;
					break;
				case 'profile':
					ret = <Profile korisnikId={korisnikId} promeniPogled={this.promeniPogled} poruka={this.growl}></Profile>;
					break;
				case 'profile-edit':
					ret = <ProfileEdit korisnikId={korisnikId} promeniPogled={this.promeniPogled} poruka={this.growl}></ProfileEdit>
					break;
				case 'voznja-add':
					ret = <VoznjaAdd promeniPogled={this.promeniPogled} poruka={this.growl}></VoznjaAdd>;
					break;
				case 'voznja-edit':
					ret = <VoznjaEdit promeniPogled={this.promeniPogled} voznjaId={voznjaId} poruka={this.growl}></VoznjaEdit>;
					break;
				case 'admin':
					ret = <Admin promeniPogled={this.promeniPogled} poruka={this.growl}></Admin>;
					break;
				default:
					break;
			}
	
			return ret;
		}

		this.state = {
			meni: this.napraviMeni(false),
			pogled: this.napraviPogled('home'),
			loading: false
		}
	}

	promeniPogled(pogled, korisnikId = undefined, voznjaId = undefined) {
		this.setState({
			pogled: this.napraviPogled(pogled, korisnikId, voznjaId)
		});
	}

	proveriLogged() {
		let promise = fetchLib.logged();
		promise.then(odgovorJSON => {
			console.log(odgovorJSON);
			this.setState({loading: true});
			if (odgovorJSON['nekoJeUlogovan'] === 'true') {
				this.setState({
					meni: this.napraviMeni(true, odgovorJSON['ime'], odgovorJSON['admin'], odgovorJSON['id'])
				});
			}
			else {
				this.setState({
					meni: this.napraviMeni(false)
				});
			}
			this.setState({loading: false});
		});
	}

	odjavi() {
		let promise = fetchLib.signout();
		promise.then(odgovorJSON => {
			this.setState({loading: true});
			this.setState({
				pogled: this.napraviPogled('home'),
				meni: this.napraviMeni(false)
			});
			this.setState({loading: false});
		});
	}

	componentWillMount() {
		this.proveriLogged();
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
				<div className="App">
					<Growl ref={(el) => this.growl = el}></Growl>
					{this.state.meni}
					<div className="main-container">
						{this.state.pogled}
					</div>
				</div>
			);
		}
	}
}

export default App;
