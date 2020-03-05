import React, { Component } from 'react';
import "../css/Home.css";

export class Home extends Component {

	render() {
		return (
			<div className="home-container">
				<div className="home-fieldset">
					<div className="home-podnaslov">
						Prevezi Me!
					</div>
					<div className="home-text">
						Dobrodošli na Prevezi Me aplikaciju. Možete se registrovati ili prijaviti ako ste postojeći korisnik klikom na odgovarajuće dugme u meniju.
					</div>
				</div>
			</div>
		);
	}
}