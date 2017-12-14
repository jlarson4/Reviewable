import * as React from 'react';
import { render } from 'react-dom';	
import 'whatwg-fetch'

const velocity = require('velocity-react');

export class ReviewModal extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			newReviewable: false,
			createReview: false,
			reviewableID: -1,
			reviewableTitle: '',
			newRating: 1,
			newRatingTemp: 1,
		}

		
	}

	render() {
		
		return  (
			<div id="reviewable-modal" className='modal'>
				<div className="reviewable-content">
					<velocity.VelocityTransitionGroup enter={{animation: "fadeIn", delay: "400"}} leave={{animation: "fadeOut"}}>
						{this.renderSelectOptions()}
						{this.renderReviewForm()}
						{this.renderNewReviewable()}
					</velocity.VelocityTransitionGroup>
				</div>
			</div> 
		);
	}
	renderReviewForm(){
		if(this.state.createReview){
			return (
				<div>
					<div className="modalHeader">
						<span className='modalHeadline'>
							{this.state.reviewableTitle}
						</span>
						<a className="modal-close" onClick={this.props.handleClick}>
						</a>
					</div>
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
				</div>
			);
		}
	}
	renderNewReviewable(){
		//form for adding a reviewable. this needs to be made and then direct to review form
		//needs reviewable name
		//reviewable category 
		//reviewable subcategory
		//reviewable coordinates
		//username
		//school id
		if(this.state.newReviewable) {
			return (
				<div>
					<div className="modalHeader">
						<span className='modalHeadline'>
							Add a New Reviewable!
						</span>
						<a className="modal-close" onClick={this.props.handleClick}>
						</a>
					</div>
					<div className='modal-section'>
					
					</div>
				</div>
			);
		}
	}

	renderSelectOptions(){
		if(!this.state.newReviewable && !this.state.createReview){
			let options = [];
			options.push(<option value="">Select</option>);
			let reviewables = [{name: 'David Straz Center', reviewableID: 0}, {name: 'Lentz Hall', reviewableID: 1}]; //getSchoolOptions()
			for(let i = 0; i < reviewables.length; i++) {
				options.push(<option value={reviewables[i]['name'] + "-" + reviewables[i]['reviewableID']} key={"school-" + reviewables[i]['reviewableID']}>{reviewables[i]['name']}</option>);
			}
			options.push(<option value="new">Add New Reviewable</option>);
			return (
				<div>
					<div className="modalHeader">
						<span className='modalHeadline'>
							Select Your Reviewable
						</span>
						<a className="modal-close" onClick={this.props.handleClick}>
						</a>
					</div>
					<div className='modal-section'>
						<select id='reviewable-select'>
							{options}
						</select>
						<a className='btn' onClick={this.submitSelect.bind(this)}>Submit</a>
					</div>
				</div>
			);
		}

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
	toggleReviewForm(){
		this.setState({createReview: !this.state.createReview});
		this.setState({newRating: this.state.averageRating})
		this.setState({newRatingTemp: this.state.averageRating})
	}
	submitReview(){
		//review Submission AJAX goes here
		// action /addReview
		let val = document.getElementById('reviewable-textarea-input').value;
		let categories = {
			reviewableID: this.state.reviewableID,
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
				this.setState({createReview: false})
			}.bind(this))
		}.bind(this))
		this.setState({createReview: false})
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
	submitSelect(){
		let val = document.getElementById('reviewable-select').value;
		if(val == 'new') {
			this.setState({newReviewable: true})
		} else if(val != "") {
			let id = val.split("-")[1];
			let name = val.split("-")[0];
			this.setState({createReview: true, reviewableID: id, reviewableTitle: name});
		}
	}
}