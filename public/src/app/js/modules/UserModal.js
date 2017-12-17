import * as React from 'react';
import { render } from 'react-dom';	
import 'whatwg-fetch'

const velocity = require('velocity-react');

export class UserModal extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			editReview: -1,
			reviews: this.getUserReviews(),
			newRating: 1,
			newRatingTemp: 1
		}

		
	}

	render() {
		
		return  (
			<div id="reviewable-modal" className='modal'>
				<div className="reviewable-content">
					<div className="modalHeader">
						<span className='modalHeadline'> {this.props.username} </span>
						<a className="modal-close" onClick={this.props.handleClick}>
						</a>
					</div>
					{this.renderUserInfo()}
				</div>
			</div> 
		);
	}

	renderUserInfo(){
		return (
			<div className='modal-section'>
				<h1 className="reviews-header"> Your Reviews </h1>
				<div className="span_8 modal-reviews">
					<div className="scrollable-review-div">
						{this.renderReviews()}
					</div>
				</div>
				<div className="span_4 modal-update-user">
					<h1 className='userSubHeader'><label htmlFor='email'> Email </label></h1>
					<input type='text' placeholder='Email' name='email' id='email'/>
					<h1 className='userSubHeader'><label htmlFor='password'> Password </label></h1>
					<input type='password' placeholder='Password' name='password' id='cp'/>

					<div className="user-update-button"><a className='btn' onClick={this.updateUserInfo.bind(this)}> Update</a></div>
				</div>
			</div>
		);
	}

	getRatingsGraphic(r, c){
		let graphic = [];
		for(let i = 0; i < 5; i++){
			if(i < r) {
				graphic.push(<img src="src/app/css/solid-star.png" className={'star solid-star ' + c} key={'star-' + i}/>);
			} else {
				graphic.push(<img src="src/app/css/empty-star.png" className={'star empty-star ' + c}  key={'star-' + i}/>);
			}
		}
		return graphic;
	}

	getClickableRatingsGraphic(r, c){
		let graphic = [];
		for(let i = 0; i < 5; i++){
			if(i < r) {
				graphic.push(<img src="src/app/css/solid-star.png" data-rating={i+1} className={'star solid-star ' + c} onClick={(event) => this.setNewReviewRating(event)} onMouseEnter={(event) => this.setNewTempReviewRating(event)} onMouseLeave={this.resetNewReviewRating.bind(this)} key={'star-' + i}/>);
			} else {
				graphic.push(<img src="src/app/css/empty-star.png" data-rating={i+1} className={'star empty-star ' + c}  onClick={(event) => this.setNewReviewRating(event)} onMouseEnter={(event) => this.setNewTempReviewRating(event)} onMouseLeave={this.resetNewReviewRating.bind(this)} key={'star-' + i}/>);
			}
		}
		return graphic;
	}

	renderReviews(){
		let reviews = [];
		for(let i = 0; i < this.state.reviews.length; i++) {
			
			reviews.push(
				<velocity.VelocityTransitionGroup enter={{animation: "fadeIn", delay: "400"}} leave={{animation: "fadeOut"}}  key={'review-' + i}>
					{this.renderEditArea(i)}
					{this.renderSingleReview(i)}
				</velocity.VelocityTransitionGroup>
			);
		}
		return reviews;
	}

	renderSingleReview(i){
		if(this.state.reviews[i]['id'] != this.state.editReview){
			return (
				<div className='single-review user-single-review'>
					<p className='review-text'>"{this.state.reviews[i]['review']}"</p>
					<span className='review-editing'>
						<span className='review-edit-option' data-rating={this.state.reviews[i]['rating']} id={'review-edit-' + this.state.reviews[i]['id']} onClick={(event) => this.setEditReview(event)}>Edit </span> 
						<span className='review-delete-option' id={'review-delete-' + this.state.reviews[i]['id']} onClick={(event) => this.deleteReview(event)}>Delete </span>
						<span className='mini-rating'>
							{this.getRatingsGraphic(this.state.reviews[i]['rating'], 'mini-graphic')}
						</span>
					</span>
				</div>
			);
		}
	}

	renderEditArea(i){
		//renders a text area with the review and clickable graphic in place of regular text and edit option
		if(this.state.reviews[i]['id'] == this.state.editReview){
			return (
				<div className='single-review user-single-review editable-review'>
					<textarea id="reviewable-textarea-input" className='editing-textarea' name='the-review' placeholder='Write a review...' rows='12' defaultValue={this.state.reviews[i]['review']}/>
					<span className='review-editing'>
						<span className='review-submit-option btn' id={'review-submit-' + this.state.reviews[i]['id']} onClick={(event) => this.submitEditedReview(event)}>Submit Changes</span>
								<a className='cancel-edit btn' onClick={this.cancelEdit.bind(this)}>Cancel</a>
						<span className='mini-rating'>
							{this.getClickableRatingsGraphic(this.state.newRatingTemp, 'mini-graphic')}
						</span>
					</span>
				</div>
			);
		}
	}

	cancelEdit(){
		this.setState({editReview: -1})
	}

	setEditReview(event){
		//set the states for editable review area
		this.setState({editReview: event.target.id.split('-')[2]})
		this.setNewTempReviewRating(event);
	}

	submitEditedReview(){
		let val = document.getElementById('reviewable-textarea-input').value;
		let categories = {
			reviewableID: this.props.reviewableID,
			review: val,
			rating: this.state.newRating,
			username: this.props.username
		}
		let data = JSON.stringify( categories );
		fetch('./editReview', {
			method: 'POST',
			body: data
		}).then(function(response: any){
			response.json().then(function(result: any){
				//update the review from the review state thing
			}.bind(this))
		}.bind(this))
	}

	deleteReview(event){
		//show confirmation box

		//do delete ajax
		let categories = {
			reviewID: event.target.id.split('-')[1],
		}
		let data = JSON.stringify( categories );
		fetch('./deleteReview', {
			method: 'POST',
			body: data
		}).then(function(response: any){
			response.json().then(function(result: any){
				//remove review from the states
			}.bind(this))
		}.bind(this))
	}

	updateUserInfo(){
		//update the user info
		let p = document.getElementById('cp').value;
		let e = document.getElementById('email').value;
		let categories = {
			username: this.props.username,
			password: p,
			email: e,
		}
		let data = JSON.stringify( categories );
		fetch('./updateUser', {
			method: 'POST',
			body: data
		}).then(function(response: any){
			response.json().then(function(result: any){
				let p = document.getElementById('cp').value = "";
				let e = document.getElementById('email').value = "";		
			}.bind(this))
		}.bind(this))
	}

	getUserReviews(){
		//do delete ajax
		// let categories = {
		// 	username: this.props.username,
		// }
		// let data = JSON.stringify( categories );
		// fetch('./getUserReviews', {
		// 	method: 'POST',
		// 	body: data
		// }).then(function(response: any){
		// 	response.json().then(function(result: any){
		// 		this.setState({reviews: result['reviews']});
		// 	}.bind(this))
		// }.bind(this))

		return [
					{
						id: 0,
						rating: 1,
						username: 'Test',
						up_votes: 10,
						down_votes: 4,
						review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
					},
					{
						id: 1,
						rating: 3,
						username: 'Test',
						up_votes: 15,
						down_votes: 37,
						review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
					},
					{
						id: 2,
						rating: 2,
						username: 'Test',
						up_votes: 20,
						down_votes: 2,
						review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
					},
					{
						id: 3,
						rating: 2,
						username: 'Test',
						up_votes: 20,
						down_votes: 2,
						review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
					},

				];
	}

	setNewReviewRating(event){
		let newRate = parseInt(event.target.getAttribute('data-rating'));
		this.setState({newRating: newRate})
		this.setState({newRatingTemp: newRate})
	}
	setNewTempReviewRating(event){
		let newRate = parseInt(event.target.getAttribute('data-rating'));
		this.setState({newRatingTemp: newRate})
	}
	resetNewReviewRating(){
		this.setState({newRatingTemp: this.state.newRating})
	}
}