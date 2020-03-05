import React, { Component } from 'react';
import {Menubar} from 'primereact/menubar';
import {Button} from 'primereact/button';
import {SplitButton} from 'primereact/splitbutton'
import "../css/TopMenu.css";

export class TopMenu extends Component {
	constructor(props) {
		super(props);
		
		this.homeClick = this.homeClick.bind(this);
		this.registerClick = this.registerClick.bind(this);
		this.loginClick = this.loginClick.bind(this);
		this.editClick = this.editClick.bind(this);
		this.postaviClick = this.postaviClick.bind(this);
		this.searchClick = this.searchClick.bind(this);
		this.odjaviClick = this.odjaviClick.bind(this);
		this.profileClick = this.profileClick.bind(this);
		this.adminClick = this.adminClick.bind(this);

		this.itemsNotLoggedIn = [
			{
				label: <span className="topmenu-naslov">PREVEZI ME</span>,
				command: (e) => {this.homeClick()}
			},
		];

		this.profileButtonItems = [
			{
				label: 'Izmeni profil',
				icon: 'pi pi-pencil',
				command: (e) => {this.editClick(this.props.id)}
			},
			{
				label: 'Odjavi se',
				icon: 'pi pi-sign-out',
				command: (e) => {this.odjaviClick()}
			}
		]

		this.profileButtonItemsAdmin = [
			{
				label: 'Izmeni profil',
				icon: 'pi pi-pencil',
				command: (e) => {this.editClick(this.props.id)}
			},
			{
				label: 'Odjavi se',
				icon: 'pi pi-sign-out',
				command: (e) => {this.odjaviClick()}
			},
			{
				label: 'Admin panel',
				icon: 'pi pi-key',
				command: (e) => {this.adminClick()}
			}
		]

		// DESKTOP MENI
		this.itemsDesktopLoggedIn = [
			{
				label: <span className="topmenu-naslov">PREVEZI ME</span>,
				command: (e) => {this.homeClick()}
			},
			{
				label: <span className="topmenu-text">Pronađi vožnju</span>,
				icon: 'pi pi-fw pi-search',
				command: (e) => {this.searchClick()}
			},
			{
				label: <span className="topmenu-text">Postavi novu vožnju</span>,
				icon: 'pi pi-fw pi-plus',
				command: (e) => {this.postaviClick()}
			}
		];
		this.menuDesktopNotLoggedIn = 
		<Menubar model={this.itemsNotLoggedIn} className="topmenu-desktop">
			<Button label="Prijavi se" icon="pi pi-sign-in" className="p-button-secondary" onClick={this.loginClick}></Button>
			<Button label="Registruj se" style={{marginLeft: 5}} onClick={this.registerClick}></Button>
		</Menubar>;
		this.menuDesktopLoggedIn = 			
		<Menubar model={this.itemsDesktopLoggedIn} className="topmenu-desktop">
			<SplitButton label={this.props.ime} icon="pi pi-user" className="p-button-success" tooltipOptions={{position: 'bottom'}} onClick={(e) => this.profileClick(this.props.id, e)} model={(this.props.admin === 1 ? this.profileButtonItemsAdmin : this.profileButtonItems)}></SplitButton>
		</Menubar>;

		// MOBILINI MENI
		this.itemsMobileLoggedIn = [
			{
				label: <span className="topmenu-naslov">PREVEZI ME</span>,
				command: (e) => {this.homeClick()}
			},
			{
				label: '',
				items: [
					{
						label: <span className="topmenu-text">Pronađi vožnju</span>,
						icon: 'pi pi-fw pi-search',
						command: (e) => {this.searchClick()}
					},
					{
						label: <span className="topmenu-text">Postavi novu vožnju</span>,
						icon: 'pi pi-fw pi-plus',
						command: (e) => {this.postaviClick()}
					}
				]
			},
		];

		this.menuMobileNotLoggedIn = 
		<Menubar model={this.itemsNotLoggedIn} className="topmenu-mobile">
			<Button icon="pi pi-sign-in" className="p-button-secondary" onClick={this.loginClick}></Button>
			<Button label="Registruj se" style={{marginLeft: 5}} onClick={this.registerClick}></Button>
		</Menubar>;
		this.menuMobileLoggedIn = 			
		<Menubar model={this.itemsMobileLoggedIn} className="topmenu-mobile">
			<SplitButton label={this.props.ime} icon="pi pi-user" className="p-button-success" tooltipOptions={{position: 'bottom'}} onClick={(e) => this.profileClick(this.props.id, e)} model={(this.props.admin === 1 ? this.profileButtonItemsAdmin : this.profileButtonItems)}></SplitButton>
		</Menubar>;
		
		if (this.props.loggedin) {
			this.state = {
				desktopMenu: this.menuDesktopLoggedIn,
				mobileMenu: this.menuMobileLoggedIn
			}
		}
		else {
			this.state = {
				desktopMenu: this.menuDesktopNotLoggedIn,
				mobileMenu: this.menuMobileNotLoggedIn
			}
		}
	}

	homeClick() {
		this.props.promeniPogled('home');
	}
	registerClick() {
		this.props.promeniPogled('register');
	}
	loginClick() {
		this.props.promeniPogled('login');
	}
	profileClick(id) {
		this.props.promeniPogled('profile', id);
	}
	editClick(id) {
		this.props.promeniPogled('profile-edit', id);
	}
	postaviClick() {
		this.props.promeniPogled('voznja-add');
	}
	searchClick() {
		this.props.promeniPogled('search');
	}
	odjaviClick() {
		this.props.odjavi();
	}
	adminClick() {
		this.props.promeniPogled('admin');
	}


    render() {
		return (
            <div className="topmenu">
				{this.state.desktopMenu}
				{this.state.mobileMenu}
            </div>	
		);
	}	
}
