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
			isBuilding: false,
			isPerson: false,
			newCategory: false,
			reviewableID: -1,
			reviewableTitle: '',
			newRating: 1,
			newRatingTemp: 1,
			numFloors: 1,
			height: 25,
			width: 30,
			margin: 35
		}

		
	}

	render() {
		
		return  (
			<div id="reviewable-modal" className='modal'>
				<div className="reviewable-content" style={{height: this.state.height + "%", width: this.state.width + "%", marginLeft: this.state.margin + "%"}}>
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
							<a className='btn' onClick={this.toggleReviewForm.bind(this)}>Submit</a>
							<a className='cancel new-rating-cancel' onClick={this.toggleReviewForm.bind(this)}>Cancel</a>
						</div>
					</div>
				</div>
			);
		}
	}
	renderNewReviewable(){
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
						<div className='modal-new-scrolling'>
							<div className='new-reviewable-modal-content'>
								<h3 className='logSubHeader'><label htmlFor='name'> Reviewable Name </label></h3>
								<input type='text' placeholder='Name' name='name' id='name'/>
								
								<h3 className='logSubHeader'><label htmlFor='category-select'> Select a Category </label></h3>
								<select id='category-select' name='category-select' onChange={this.categoryChange.bind(this)}>
									<option value=''>Select</option>
									<option value='building'>Place</option>
									<option value='class'>Class</option>
									<option value='person'>Person</option>
								</select>
								<velocity.VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
									{this.renderBuildingSelect()}
									{this.renderPersonSelect()}
								</velocity.VelocityTransitionGroup>
								<h3 className='logSubHeader'><label htmlFor='lat'> Latitude </label></h3>
								<input type='number' placeholder='Latitude' name='lat' id='lat'/>
								<h3 className='logSubHeader'><label htmlFor='lng'> Longitude </label></h3>
								<input type='number' placeholder='Longitude' name='lng' id='lng'/>
								<a className='btn' onClick={this.submitNewReviewable.bind(this)}>Submit</a>
								<a className='cancel new-rating-cancel' onClick={this.cancelNew.bind(this)}>Cancel</a>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}

	renderSelectOptions(){
		if(!this.state.newReviewable && !this.state.createReview){
			let options = [];
			options.push(<option value="" key={"buidling-" + -1}>Select</option>);
			let reviewables = this.props.reviews;
			for(let i = 0; i < reviewables.length; i++) {
				options.push(<option value={reviewables[i]['title'] + "-" + reviewables[i]['id']} key={"school-" + reviewables[i]['id']}>{reviewables[i]['title']}</option>);
			}
			options.push(<option value="new" key={"buidling-" + -2}>Add New Reviewable</option>);
			return (
				<div>
					<div className="modalHeader">
						<span className='modalHeadline make-a-rating'>
							Select Your Reviewable
						</span>
						<a className="modal-close make-a-rating-close" onClick={this.props.handleClick}>
						</a>
					</div>
					<div className='modal-section'>
						<select id='reviewable-select'>
							{options}
						</select>
						<a className='btn reviewable-select' onClick={this.submitSelect.bind(this)}>Submit</a>
					</div>
				</div>
			);
		}
	}

	renderBuildingSelect(){
		if(this.state.isBuilding){
			let options = [];
			options.push(<option value="" key={"buidling-" + -1}>Select</option>);
			let reviewables = this.getBuildingOptions()
			for(let i = 0; i < reviewables.length; i++) {
				options.push(<option value={reviewables[i]['building_name'] + "-" + reviewables[i]['noOfFloors']} key={i + reviewables[i]['noOfFloors']}>{reviewables[i]['building_name']}</option>);
			}
			return (
				<div>
					<h3 className='logSubHeader'><label htmlFor='building-select'> Select The Building </label></h3>
					<select id='building-select' name='building-select' onChange={this.placeChange.bind(this)}>
						{options}
					</select>

					<h3 className='logSubHeader'><label htmlFor='floor-number'> Floor Number </label></h3>
					<input type='number' placeholder='Floor Number' min='1' max={this.state.numFloors} name='floor-number' id='floor-number'/>
				</div>
			);
		}
	}

	renderPersonSelect(){
		if(this.state.isPerson){
			let options = [];
			options.push(<option value="" key={"buidling-" + -1}>Select</option>);
			let types = this.getRoleOptions();
			for(let i = 0; i < types.length; i++) {
				options.push(<option value={types[i]} key={"buidling-" + i}>{types[i]}</option>);
			}
			options.push(<option value="new" key={"buidling-" + -2}>Add New Person Type</option>);
			return (
				<div>
					<h3 className='logSubHeader'><label htmlFor='person-select'> Select a Role </label></h3>
					<select id='person-select' onChange={this.personChange.bind(this)}>
						{options}
					</select>
					<velocity.VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
						{this.renderNewPersonCategory()}
					</velocity.VelocityTransitionGroup>
				</div>
			);
		}
	}

	renderNewPersonCategory(){
		if(this.state.newCategory) {
			return (
				<div>
					<h3 className='logSubHeader'><label htmlFor='category'> New Role </label></h3>
					<input type='text' placeholder='Category' name='category' id='category'/>
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
		if(this.state.createReview == true) {
			this.setState({height: 25,
				width: 30,
				margin: 35});
		}
		this.setState({createReview: !this.state.createReview});
		this.setState({newRating: this.state.averageRating})
		this.setState({newRatingTemp: this.state.averageRating})
	}

	placeChange(){
		let val = document.getElementById('building-select').value.split('-')[1];
		console.log(val)
		this.setState({numFloors: val})
	}

	personChange(){
		let val = document.getElementById('person-select').value;
		if(val == 'new') {
			this.setState({newCategory: true})
		} else {
			this.setState({newCategory: false})
		}
	}
	categoryChange(){
		let val = document.getElementById('category-select').value;
		if(val == 'building'){
			this.setState({isBuilding: true, isPerson: false});
		} else if (val == 'person') {
			this.setState({isPerson: true, isBuilding: false});
		} else {
			this.setState({isPerson: false, isBuilding: false});
		}
		
	}
	cancelNew(){
		this.setState({newReviewable: false, height: 25,
			width: 30,
			margin: 35})
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
			this.setState({newReviewable: true, height: 80, width: 80, margin: 10})
		} else if(val != "") {
			let id = val.split("-")[1];
			let name = val.split("-")[0];
			this.setState({createReview: true, reviewableID: id, reviewableTitle: name, height: 80, width: 80, margin: 10});
		}
	}
	submitNewReviewable(){
		let t = document.getElementById('name').value;
		let l = document.getElementById('lat').value + '/' + document.getElementById('lng').value; //latlong
		let u = this.props.username;
		let c = document.getElementById('category-select').value; //category
		let sub = ''; //subcategory
		let r = ''; //description

		if(c == 'building') {
			sub = document.getElementById('building-select').value;
			r = document.getElementById('floor-number').value;
		} else if (c == 'person') {
			sub = document.getElementById('person-select').value;
		}
		//sends in the new reviewable and loads review form for that reviewable
		let categories = {
			Reviewable_name: t,
			latLong: l,
			username: u,
			category: c,
			subCategory: sub,
			reviewableDescription: r
		}
		let data = JSON.stringify( categories );
		fetch('./addReviewable', {
			method: 'POST',
			body: data
		}).then(function(response: any){
			response.json().then(function(result: any){
				console.log(result)
				this.setState({newReviewable: false, reviewableID: 0, reviewableTitle: result['reviewableID']});
				this.setState({createReview: true});
			}.bind(this))
		}.bind(this))
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
	
	getBuildingOptions(){
		//request school options from the server
		console.log("Building Options Request Here");
		return [{building_name: 'David A. Straz, Jr. Center', buidling_id: 0, noOfFloors: 1}, {building_name: 'Lentz Hall', buidling_id: 1, noOfFloors: 3}];
	}
	getRoleOptions(){
		//request role options from server
		console.log("Role Options Request Here");
		return ['Barista', 'Admin'];
	}
}