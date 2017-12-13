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
		return (
			<div className='signInBackground'>
				<div className="signInFade">
					<div className ='signInContent'>
					<h1 className='logHeader'> Reviewable </h1>
						<velocity.VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
							{this.renderSignIn()}
							{this.renderSignUp()}
						</velocity.VelocityTransitionGroup>
					</div>
				</div>
			</div>
		)
	}

	renderSignIn(){
		if(this.state.signIn){
			return (
				<div id='signinForm'>
					<h3 className='logSubHeader'><label htmlFor='username'> Username </label></h3>
					<input type='text' placeholder='Username' name='username' id='username'/>
					<h3 className='logSubHeader'><label htmlFor='password'> Password </label></h3>
					<input type='password' placeholder='Password' name='password' id='password'/>
					<p className='error' id='signInError' width='100%'/>
					<div className="submitButtons">
						<a className='signup' onClick={this.signInToggle.bind(this)}> Sign Up </a>
						<a className='login btn' onClick={this.submitSignIn.bind(this)}> Log In </a>
					</div>
				</div>
			);
		}
	}

	renderSignUp(){
		if(!this.state.signIn){
			return (
				<div id='signupForm'>
					<div className="span_6">
						<h5 className='logSubHeader'><label htmlFor='username'> Username </label></h5>
						<input type='text' placeholder='Username' name='username' id='username'/>
						<h5 className='logSubHeader'><label htmlFor='password'> Password </label></h5>
						<input type='password' placeholder='Password' name='password' id='password'/>
						<h5 className='logSubHeader'><label htmlFor='firstname'> First Name </label></h5>
						<input type='text' placeholder='First Name' name='firstname' id='fn'/>
					</div>
					<div className="span_6">
						<h5 className='logSubHeader'><label htmlFor='email'> Email </label></h5>
						<input type='text' placeholder='Email' name='email' id='email'/>
						<h5 className='logSubHeader'><label htmlFor='confirmpassword'> Confirm Password </label></h5>
						<input type='password' placeholder='Confirm Password' name='confirmpassword' id='cp'/>
						<h5 className='logSubHeader'><label htmlFor='lastname'> Last Name </label></h5>
						<input type='text' placeholder='Last Name' name='lastname' id='ln'/>
					</div>
					<p className='desc'>*your name will not appear anywhere on site, we require a first and last name for security purposes only </p>
					<div><span className="error" id='error-message'/></div>
					<div className="submitButtons">
						<a className='signup btn' onClick={this.submitSignUp.bind(this)}>Submit!</a>
						<a className='cancel' onClick={this.signInToggle.bind(this)}>Cancel</a>
					</div>
				</div>
			);
		}
	}

	signInToggle(){
		this.setState({signIn: !this.state.signIn})
	}

	submitSignUp(){
		let u = document.getElementById('username').value;
		let p = document.getElementById('password').value;
		let p2 = document.getElementById('cp').value;
		let fn = document.getElementById('fn').value;
		let ln = document.getElementById('ln').value;
		let e = document.getElementById('email').value;

		if(p == p2 && p != ""){
			let categories = {
				username: u,
				password: p,
				email: e,
				firstName: fn,
				lastName: ln
			}
			let data = JSON.stringify( categories );
			console.log(data)
			fetch('./signUp', {
				method: 'POST',
				body: data
			}).then(function(response: any){
				response.json().then(function(result: any){
					if(result['signed_up']){
						this.props.function_pointer(true, 'Test');
					}
				}.bind(this))
			}.bind(this))
		} else {
			$('#password').addClass('error');
			$('#cp').addClass('error');
			if(p == ""){
				$('#error-message').text('You must input a password')
			}else {
				$('#error-message').text('Your two passwords did not match, retry')
			}
		}
	}

	submitSignIn(){
		let u = document.getElementById('username').value;
		let p = document.getElementById('password').value;
		let categories = {
			username: u,
			password: p
		}
		let data = JSON.stringify( categories );
		fetch('./signIn', {
			method: 'POST',
			body: data
		}).then(function(response: any){
			response.json().then(function(result: any){
				if(result['signed_up']){
					this.props.function_pointer(true, 'Test');
				} else {
					$('#signInError').text("Incorrect Username or Password, retry");
				}
			}.bind(this))
		}.bind(this))
	}
}