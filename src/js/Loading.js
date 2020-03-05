import React, { Component } from 'react';
import "../css/Loading.css";

export class Loading extends Component {
	render() {
		return (
			<div className="loading-container">
				<i className="pi pi-spin pi-spinner"></i>
			</div>
		);
	}
}