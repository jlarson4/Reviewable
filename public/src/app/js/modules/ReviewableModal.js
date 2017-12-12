import * as React from 'react';
import { render } from 'react-dom';	
import 'whatwg-fetch'

const velocity = require('velocity-react');

export class ReviewableModal extends React.Component {
	constructor(props) {
		super(props)
		let t = this.getAverageRating();
		this.state = {
			averageRating: t,
			newRating: t,
			newRatingTemp: t,
			createReview: false
		}
	}

	render() {
		
		return  (
			<div id="reviewable-modal" className='modal'>
				<div className="reviewable-content">
					<div className="modalHeader">
						<span className='modalHeadline'> {this.props.title} </span>
						<div className='rating-stars'>
							{this.getRatingsGraphic(this.state.averageRating, '')}
						</div>
						<a className="modal-close" onClick={this.props.handleClick}>
						</a>
					</div>
					<velocity.VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
						{this.renderReviewData()}
						{this.renderReviewForm()}
					</velocity.VelocityTransitionGroup>
				</div>
			</div> 
		);
	}

	renderReviewData(){
		if(!this.state.createReview){
			return (
				<div className='modal-section'>
					<h1 className="reviews-header"> Reviews </h1>
					<div className="span_8 modal-reviews">
						<div className="scrollable-review-div">
							{this.renderReviews()}
						</div>
					</div>
					<div className="span_4 modal-make-review">
						<div className="mapMenuButton"><a className='btn' onClick={this.toggleReviewForm.bind(this)}> Make A Rating</a></div>
					</div>
				</div>
			);
		}
	}

	renderReviewForm(){
		if(this.state.createReview){
			return (
					<div className='modal-section'>
						<textarea id="reviewable-textarea-input" className='review-textarea' name='the-review' placeholder='Write a review...' rows='12'/>
						<h1 className="reviews-header"> Rating: </h1>
						<div className='new-review-rating-graphic'>
							{this.getClickableRatingsGraphic(this.state.newRatingTemp, '')}
						</div>
						<div className="new-rating-submit">
							<a className='btn' onClick={this.submitReview.bind(this)}>Submit</a>
							<a className='cancel new-rating-cancel' onClick={this.toggleReviewForm.bind(this)}>Cancel</a>
						</div>
					</div>
				);
		}
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
		for(let i = 0; i < this.props.reviews.length; i++) {
			//build JSX review object
			let reviewRating = this.props.reviews[i]['up_votes'] - this.props.reviews[i]['down_votes'];
			let reviewRatingClass = '';
			if(reviewRating > 0){
				reviewRatingClass = 'green';
			} else {
				reviewRatingClass = 'red';
			}
			reviews.push(
				<div className='single-review' key={'review-' + i}>
					<h3 className='user-header'>{this.props.reviews[i]['username']} says: </h3>
					<p className='review-text'>"{this.props.reviews[i]['review']}"</p>
					<span className='review-rating'>Was this review helpful? 
						<span className='review-rating-option' id={'reviewUp-' + this.props.reviews[i]['id']} onClick={(event) => this.eventUpVote(event)}> Yes </span> 
						<span className='review-rating-option' id={'reviewDown-' + this.props.reviews[i]['id']} onClick={(event) => this.eventDownVote(event)}>No </span> 
						<span className={'reviewRating ' + reviewRatingClass}>({reviewRating})</span>
						<span className='mini-rating'>
							{this.getRatingsGraphic(this.props.reviews[i]['rating'], 'mini-graphic')}
						</span>
					</span>

				</div>
			);

		}
		return reviews;
	}

	getAverageRating(){
		let temp = 0;
		for(let i = 0; i < this.props.reviews.length; i++) {
			temp += this.props.reviews[i]['rating'];
		}
		temp = temp / this.props.reviews.length;
		return temp;
	}
	eventUpVote(event){
		let id = event.target.id.split('-')[1];
		let categories = {
			reviewID: id,
			votetype: 1
		}
		let data = JSON.stringify( categories );
		console.log(data);
		fetch('./vote', {
			method: 'POST',
			body: data
		}).then(function(response: any){
			response.json().then(function(result: any){
				console.log(result);
			}.bind(this))
		}.bind(this))
	}
	eventDownVote(event){
		let id = event.target.id.split('-')[1];
		let categories = {
			reviewID: id,
			votetype: -1
		}
		let data = JSON.stringify( categories );
		console.log(data);
		fetch('./vote', {
			method: 'POST',
			body: data
		}).then(function(response: any){
			response.json().then(function(result: any){
				console.log(result);
			}.bind(this))
		}.bind(this))
	}
	toggleReviewForm(){
		this.setState({createReview: !this.state.createReview});
		this.setState({newRating: this.state.averageRating})
		this.setState({newRatingTemp: this.state.averageRating})
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
	submitReview(){
		//review Submission AJAX goes here
		// action /addReview
		let val = document.getElementById('reviewable-textarea-input').value;
		let categories = {
			reviewableID: this.props.reviewableID,
			review: val,
			rating: this.state.newRating,
			username: this.props.username
		}
		let data = JSON.stringify( categories );
		fetch('./addReview', {
			method: 'POST',
			body: data
		}).then(function(response: any){
			response.json().then(function(result: any){
				console.log(result);
				this.setState({createReview: false})
			}.bind(this))
		}.bind(this))
				this.setState({createReview: false})
	}
}