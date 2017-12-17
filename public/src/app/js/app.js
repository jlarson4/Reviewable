import * as React from 'react';
import { render } from 'react-dom';	
import 'whatwg-fetch'

import { MapComponent } from './modules/MapComponent.js';
import { GoogleMap } from './modules/GoogleMap.js';
import { PracticeComp } from './modules/PracticeComp.js';
import { SignInUp } from './modules/SignInUp.js';

const velocity = require('velocity-react');

class App extends React.Component {

	constructor(){
		super();
		this.state = {
			logged_in: false,
			username: '',
			school_id: -1
		}
	}


	render() {

		return  (
			<div>
				<velocity.VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
					{this.renderLogging()}
					{this.renderHome()} 
				</velocity.VelocityTransitionGroup>
			</div>
		);
		
	}

	renderLogging(){
		if(!this.state.logged_in) {
			let sign_props = {
				function_pointer: this.setLoggedIn.bind(this)
			}

			return (
				<SignInUp {...sign_props}/>
			)
		}
	}

	renderHome(){
		if(this.state.logged_in) {
			this.requestReviewableDataFromServer();
			let props = {
				marker_info: [
					{
						lat: 42.6245,
						long: -87.820000,
						title: 'David A. Straz, Jr. Center',
						id: 0
					},
					{
						lat: 42.6238,
						long: -87.819850,
						title: 'Lentz Hall',
						id: 1
					},
					{
						lat: 42.576543,
						long: -87.833120,
						title: 'Stuff and Things!',
						id: 2
					}
				],
				zoom: 17,
				lat: 42.6218,
				long: -87.821127,
				username: this.state.username,
				menuItems: ['Buildings', 'Classes', 'People']
			};
			return  (
				<div>
					<PracticeComp {...props}/> 
					<MapComponent {...props}/>
				</div>
			);
		}
	}

	resizeWindow(){
		$(window).trigger('resize');
	}

	requestReviewableDataFromServer(){
		let categories = {
			category: ['building', 'people', 'classes'],
			sub_category: [],
			title: [],
			school_id: 0

		}
		let marker_info = null;
		let data = JSON.stringify( categories );
		fetch('/getpins', {
			method: 'POST',
			body: data
		}).then(function(response: any){
			response.json().then(function(result: any){
				console.log(result);
			}.bind(this))
		}.bind(this))
	}

	setLoggedIn(val, user, id){
		this.setState({logged_in: val});
		this.setState({username: user});
		this.setState({school_id: id});
	}
}


render( <App />, document.getElementById('react-root'));