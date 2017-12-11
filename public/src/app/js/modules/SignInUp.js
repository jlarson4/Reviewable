import * as React from 'react';

const velocity = require('velocity-react');
import 'whatwg-fetch'


export class SignInUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signIn: true
		}
	}

	render() {
		let content = [];
		if (this.state.signIn) {
			content = this.renderSignIn();
		 } else {
			content = this.renderSignUp();
		 }

		return (
			<div className='signInBackground'>
				<div className="signInFade">
					{content}
				</div>
			</div>
		)
	}

	renderSignIn(){
		return (
			<div className ='signInContent'>
				<h1 className='logHeader'> Reviewable </h1>
				<h3 className='logSubHeader'><label htmlFor='username'> Username </label></h3>
				<input type='text' placeholder='Username' name='username'/>
				<h3 className='logSubHeader'><label htmlFor='password'> Password </label></h3>
				<input type='password' placeholder='Password' name='password'/>
				<div className="submitButtons">
					<a className='signup' onClick={this.signInToggle.bind(this)}> Sign Up </a>
					<button className='login' onClick={this.submitSignIn.bind(this)}> Log In </button>
				</div>
			</div>
		);
	}

	renderSignUp(){
		return (
			<div className ='signInContent'>
				<h1 className='logHeader'> Reviewable </h1>
				<div className="span_6">
					<h5 className='logSubHeader'><label htmlFor='username'> Username </label></h5>
					<input type='text' placeholder='Username' name='username'/>
					<h5 className='logSubHeader'><label htmlFor='password'> Password </label></h5>
					<input type='password' placeholder='Password' name='password'/>
					<h5 className='logSubHeader'><label htmlFor='firstname'> First Name </label></h5>
					<input type='text' placeholder='First Name' name='firstname'/>
				</div>
				<div className="span_6">
					<h5 className='logSubHeader'><label htmlFor='username'> Email </label></h5>
					<input type='text' placeholder='Username' name='username'/>
					<h5 className='logSubHeader'><label htmlFor='password'> Confirm Password </label></h5>
					<input type='password' placeholder='Confirm Password' name='password'/>
					<h5 className='logSubHeader'><label htmlFor='firstname'> Last Name </label></h5>
					<input type='text' placeholder='Last Name' name='firstname'/>
				</div>
				<p className='desc'>*your name will not appear anywhere on site, we require a first and last name for security purposes only </p>
				<div className="submitButtons">
					<a className='signup btn' onClick={this.submitSignUp.bind(this)}> Submit! </a>
					<a className='cancel btn' onClick={this.signInToggle.bind(this)}> Cancel </a>
				</div>
			</div>
		);
	}

	signInToggle(){
		this.setState({signIn: !this.state.signIn})
	}

	submitSignUp(){
		console.log("Signing up!")
		let categories = {
			username: 'Test',
			password:'Test',
			email:'Test@gmail.com',
			firstName: 'Bob',
			lastName: 'Johnson'
		}
		let data = JSON.stringify( categories );
		fetch('./signUp', {
			method: 'POST',
			body: data
		}).then(function(response: any){
			response.json().then(function(result: any){
				console.log(result);
			}.bind(this))
		}.bind(this))
	}

	submitSignIn(){
		let categories = {
			username: 'Test',
			password:'Test'
		}
		let data = {};
		data["json"] = JSON.stringify( categories );
		fetch('./signIn', {
			method: 'POST',
			body: data
		}).then(function(response: any){
			response.json().then(function(result: any){
				console.log(result);
			}.bind(this))
		}.bind(this))
	}
}