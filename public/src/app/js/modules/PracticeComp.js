import * as React from 'react';

import { UserModal } from './UserModal.js';
import { ReviewModal } from './ReviewModal.js';

const velocity = require('velocity-react');


export class PracticeComp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			menuArrowArr: [],
			buildings: [
				{name: 'Bathroom 1a', reviewableID: 0, sub_category: 'David Straz Center', reviewable_description: 'david-straz-center-1'}, 
				{name: 'Bathroom 2a', reviewableID: 0, sub_category: 'David Straz Center', reviewable_description: 'david-straz-center-2'}, 
				{name: 'Bathroom 3a', reviewableID: 0, sub_category: 'David Straz Center', reviewable_description: 'david-straz-center-2'}, 
				{name: 'Bathroom 1a', reviewableID: 0, sub_category: 'Lentz Hall', reviewable_description: 'lentz-hall-1'}, 
				{name: 'Bathroom 2a', reviewableID: 0, sub_category: 'Lentz Hall', reviewable_description: 'lentz-hall-1'}, 
				{name: 'Bathroom 3a', reviewableID: 0, sub_category: 'Lentz Hall', reviewable_description: 'lentz-hall-2'}, 
			],
			classes: [{name: 'Class 1', reviewableID: 0}, {name: 'Class 2', reviewableID: 1}],
			people: [{name: 'Mahoney', reviewableID: 0, sub_category: 'professor'}, {name: 'Bob', reviewableID: 1, sub_category: 'student'}, {name: 'Bill', reviewableID: 1, sub_category: 'student'}],
			userModal: false,
			reviewModal: false
		};
		this.renderBuildingSubMenu = this.renderBuildingSubMenu.bind(this);
		this.renderClassesSubMenu = this.renderClassesSubMenu.bind(this);
		this.renderPeopleSubMenu = this.renderPeopleSubMenu.bind(this);
		this.menuArrowClicked = this.menuArrowClicked.bind(this);
	}

	menuArrowClicked(string) {
		console.log(string.target.id);

		let array=this.state.menuArrowArr;
		if (this.state.menuArrowArr.includes(string.target.id))
		{
			/*the menu is open - close it.*/
			let index = array.indexOf(string.target.id);
			array.splice(index, 1);
		}
		else
		{
			/*the menu is closed - open it.*/
			array.push(string.target.id);
		}
		this.setState({menuArrowArr: array});
	}

	renderBuildingSubMenu() {
		if (this.state.menuArrowArr.includes("Buildings"))
		{
			let sub_categories = [];
			for(let i = 0; i < this.state.buildings.length; i++) {
				if(!sub_categories.includes(this.state.buildings[i]['sub_category'])) {
					sub_categories.push(this.state.buildings[i]['sub_category']);
				}
			}
			let options = [];
			for(let i = 0; i < sub_categories.length; i++) {
				options.push(
					<div>
						<h3 className="menuItem2" key={i}>
							<label className="container2" for="XXXstring" >
			  				<input type="checkbox" name="XXXstring" defaultChecked="checked" />
			  				<span className="checkmark"></span>
								<span className="mapMenuText2">{sub_categories[i].charAt(0).toUpperCase() + sub_categories[i].slice(1)}</span>
							</label>
							<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" id={sub_categories[i]} onClick={(event) => this.menuArrowClicked(event)} />
						</h3>

					<velocity.VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
						{this.renderBuildingSubSubMenu(sub_categories[i])}
					</velocity.VelocityTransitionGroup>
						
					</div>
				);
			}
			return (
				<div>
					{options}
				</div>
			);
		}
	}
	renderBuildingSubSubMenu(sub_category){
		if (this.state.menuArrowArr.includes(sub_category))
		{
			let sub_categories = [];
			for(let i = 0; i < this.state.buildings.length; i++) {
				if(!sub_categories.includes(this.state.buildings[i]['reviewable_description']) && this.state.buildings[i]['sub_category'] == sub_category) {
					sub_categories.push(this.state.buildings[i]['reviewable_description']);
				}
			}
			let options = [];
			for(let i = 0; i < sub_categories.length; i++) {
				let split = sub_categories[i].split('-');
				options.push(
					<div>
						<h4 className="menuItem3" key={i}>
							<label className="container3" for="XXXstring" >
			  				<input type="checkbox" name="XXXstring" defaultChecked="checked" />
			  				<span className="checkmark"></span>
								<span className="mapMenuText3">{"Floor " + split[split.length-1]}</span>
							</label>
							<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" id={sub_categories[i]} onClick={(event) => this.menuArrowClicked(event)} />
						</h4>

					<velocity.VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
						{this.renderBuildingSubSubSubMenu(sub_categories[i])}
					</velocity.VelocityTransitionGroup>
						
					</div>
				);
			}
			return (
				<div>
					{options}
				</div>
			);
		}
	}
	renderBuildingSubSubSubMenu(sub_category){
		if (this.state.menuArrowArr.includes(sub_category))
		{
			let options = [];
			for(let i = 0; i < this.state.buildings.length; i++) {
				if(this.state.buildings[i]['reviewable_description'] == sub_category) {
					options.push(
						<div>
							<h5 className="menuItem4" key={i}>
								<label className="container4" for="XXXstring" >
				  				<input type="checkbox" name="XXXstring" defaultChecked="checked" />
				  				<span className="checkmark"></span>
									<span className="mapMenuText4">{this.state.buildings[i]['name']}</span>
								</label>
							</h5>
						</div>
					);
				}
			}
			return (
				<div>
					{options}
				</div>
			);
		}
	}

	renderShit() {
		return (
			<div>
				<h4 className="menuItem3">
					<label className="container3" for="XXXstring" >
						<input type="checkbox" name="XXXstring" defaultChecked="checked" />
						<span className="checkmark"></span>
						<span className="mapMenuText3">Floor 1</span>
					</label>
					<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow3" id="Floor 1" onClick={(event) => this.menuArrowClicked(event)} />
				</h4>
				{this.renderMoreShit()}
			</div>
		)
	}

	renderMoreShit() {
		return (
			<div>
				<h5 className="menuItem4">
					<label className="container4" for="XXXstring" >
						<input type="checkbox" name="XXXstring" defaultChecked="checked" />
						<span className="checkmark"></span>
						<span className="mapMenuText4">DSC 199</span>
					</label>
					<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow4" id="DSC 199" onClick={(event) => this.menuArrowClicked(event)} />
				</h5>
			</div>
		)
	}

	renderClassesSubMenu() {
		if (this.state.menuArrowArr.includes("Classes"))
		{
			let options = [];
			for(let i = 0; i < this.state.classes.length; i++) {
				options.push(
					<h3 className="menuItem2"  key={i}>
						<label className="container2" for="XXXstring" >
		  				<input type="checkbox" name="XXXstring" defaultChecked="checked" />
		  				<span className="checkmark"></span>
							<span className="mapMenuText2">{this.state.classes[i]['name']}</span>
						</label>
					</h3>
				);
			}
			return (
				<div>
					{options}
				</div>
			);
		}
	}

	renderPeopleSubMenu() {
		if (this.state.menuArrowArr.includes("People"))
		{
			let sub_categories = [];
			for(let i = 0; i < this.state.people.length; i++) {
				if(!sub_categories.includes(this.state.people[i]['sub_category'])) {
					sub_categories.push(this.state.people[i]['sub_category']);
				}
			}
			let options = [];
			for(let i = 0; i < sub_categories.length; i++) {
				options.push(
					<div>
						<h3 className="menuItem2" key={i}>
							<label className="container2" for="XXXstring" >
			  				<input type="checkbox" name="XXXstring" defaultChecked="checked" />
			  				<span className="checkmark"></span>
								<span className="mapMenuText2">{sub_categories[i].charAt(0).toUpperCase() + sub_categories[i].slice(1)}</span>
							</label>
							<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" id={sub_categories[i]} onClick={(event) => this.menuArrowClicked(event)} />
						</h3>

					<velocity.VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
						{this.renderPeopleSubSubMenu(sub_categories[i])}
					</velocity.VelocityTransitionGroup>
						
					</div>
				);
			}
			return (
				<div>
					{options}
				</div>
			);
		}
	}

	renderPeopleSubSubMenu(sub_category) {
		if(this.state.menuArrowArr.includes(sub_category)) {
			let options = [];
			for (let i=0; i<this.state.people.length; i++) {
				if(this.state.people[i]["sub_category"] == sub_category){
					options.push(
						<div>
							<h4 className="menuItem3">
								<label className="container3" for="XXXstring" >
									<input type="checkbox" name="XXXstring" defaultChecked="checked" />
									<span className="checkmark"></span>
									<span className="mapMenuText3">{this.state.people[i]['name']}</span>
								</label>
							</h4>
						</div>
					)
				}
			}
			return (
				<div>
					{options}
				</div>
			);
		}
		
	}

	render() {
		return (
		<div className="mapMenu">
			<velocity.VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
				<div className="mapMenuSearchBar"><input type="text" name="search" placeholder="Search..." /></div>

				<h2 className="menuItem">
					<label className="container" for='check1'>
	  				<input type="checkbox" name='check1' defaultChecked="checked" />
	  				<span className="checkmark"></span>
						<span className="mapMenuText">{this.props.menuItems[0]}</span>
					</label>
					<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" id={this.props.menuItems[0]} onClick={(event) => this.menuArrowClicked(event)} />
				</h2>
				<velocity.VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
					{this.renderBuildingSubMenu()}
				</velocity.VelocityTransitionGroup>
				<h2  className="menuItem">
					<label className="container" for='check2'>
	  				<input type="checkbox" name='check2' defaultChecked="checked" />
	  				<span className="checkmark"></span>
						<span className="mapMenuText">{this.props.menuItems[1]}</span>
					</label>
					<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" id={this.props.menuItems[1]} onClick={(event) => this.menuArrowClicked(event)} />
				</h2>
				<velocity.VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
					{this.renderClassesSubMenu()}
				</velocity.VelocityTransitionGroup>
				<h2  className="menuItem">
					<label className="container" for='check3'>
	  				<input type="checkbox" name='check3' defaultChecked="checked" />
	  				<span className="checkmark"></span>
						<span className="mapMenuText">{this.props.menuItems[2]}</span>
					</label>
					<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" id={this.props.menuItems[2]} onClick={(event) => this.menuArrowClicked(event)} />
				</h2>
				<velocity.VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
					{this.renderPeopleSubMenu()}
				</velocity.VelocityTransitionGroup>
				<div className="mapMenuButton"><button onClick={this.toggleNewReviewModal.bind(this)}> Make A Review</button></div>
				<div className='profile-settings-div' onClick={this.toggleUserModal.bind(this)}> <img className='gear' src="src/app/css/gear.png"/> <span> Profile Settings </span></div>
				{this.renderModal()}
			</velocity.VelocityTransitionGroup>
		</div>
		)
	}

	renderModal(){
		if(this.state.userModal) {
			let props = {
				username: this.props.username,
				handleClick: this.toggleUserModal.bind(this)
			}
			return (<UserModal {...props} />)
		} else if(this.state.reviewModal) {
			let props = {
				username: this.props.username,
				reviews: this.props.marker_info,
				handleClick: this.toggleNewReviewModal.bind(this)
			}
			return (<ReviewModal {...props} />)
		}
	}

	toggleUserModal(){
		this.setState({userModal: !this.state.userModal})
	}
	toggleNewReviewModal(){
		this.setState({reviewModal: !this.state.reviewModal})
	}
}
