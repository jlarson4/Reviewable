import * as React from 'react';

import { UserModal } from './UserModal.js';
import { ReviewModal } from './ReviewModal.js';

const velocity = require('velocity-react');


export class PracticeComp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			menuArrowArr:[],
			userModal: false,
			reviewModal: false
		};
		this.renderBuildingSubMenu = this.renderBuildingSubMenu.bind(this);
		this.renderClassesSubMenu = this.renderClassesSubMenu.bind(this);
		this.renderPeopleSubMenu = this.renderPeopleSubMenu.bind(this);
		this.menuArrowClicked = this.menuArrowClicked.bind(this);
	}

	menuArrowClicked(string)
	{
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
		this.setState(this.state.menuArrowArr, array);
	}

	renderBuildingSubMenu() {
		if (this.state.menuArrowArr.includes("Buildings"))
		{
			return(
					<h3 className="menuItem2">
						<label className="container2" for="XXXstring" >
		  				<input type="checkbox" name="XXXstring" defaultChecked="checked" />
		  				<span className="checkmark"></span>
							<span className="mapMenuText2">DSC</span>
						</label>
						<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow2" id="DSC" onClick={(event) => this.menuArrowClicked(event)} />
						{this.renderShit()}
					</h3>
			)
		}
	}

	renderShit() {
		return (
			<h4>
				<label className="container3" for="XXXstring" >
					<input type="checkbox" name="XXXstring" defaultChecked="checked" />
					<span className="checkmark"></span>
					<span className="mapMenuText3">Floor 1</span>
				</label>
				<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow3" id="Floor 1" onClick={(event) => this.menuArrowClicked(event)} />
				{this.renderMoreShit()}
			</h4>
		)
	}

	renderMoreShit() {
		return (
			<h5>
				<label className="container4" for="XXXstring" >
					<input type="checkbox" name="XXXstring" defaultChecked="checked" />
					<span className="checkmark"></span>
					<span className="mapMenuText4">DSC 199</span>
				</label>
				<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow4" id="DSC 199" onClick={(event) => this.menuArrowClicked(event)} />
			</h5>
		)
	}

	renderClassesSubMenu() {
		if (this.state.menuArrowArr.includes("Classes"))
		{
			return(
					<h3 className="menuItem2">
						<label className="container2" for="XXXstring" >
		  				<input type="checkbox" name="XXXstring" defaultChecked="checked" />
		  				<span className="checkmark"></span>
							<span className="mapMenuText2">Boring Shit</span>
						</label>
						<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow2" id="Boring Shit" onClick={(event) => this.menuArrowClicked(event)} />
					</h3>
			)
		}
	}

	renderPeopleSubMenu() {
		if (this.state.menuArrowArr.includes("People"))
		{
			return(
					<h3 className="menuItem2">
						<label className="container2" for="XXXstring" >
		  				<input type="checkbox" name="XXXstring" defaultChecked="checked" />
		  				<span className="checkmark"></span>
							<span className="mapMenuText2">That one fucking botch who i hate with a passion</span>
						</label>
						<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow2" id="Logan" onClick={(event) => this.menuArrowClicked(event)} />
					</h3>
			)
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
				{this.renderBuildingSubMenu()}
				<h2  className="menuItem">
					<label className="container" for='check2'>
	  				<input type="checkbox" name='check2' defaultChecked="checked" />
	  				<span className="checkmark"></span>
						<span className="mapMenuText">{this.props.menuItems[1]}</span>
					</label>
					<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" id={this.props.menuItems[1]} onClick={(event) => this.menuArrowClicked(event)} />
				</h2>
				{this.renderClassesSubMenu()}
				<h2  className="menuItem">
					<label className="container" for='check3'>
	  				<input type="checkbox" name='check3' defaultChecked="checked" />
	  				<span className="checkmark"></span>
						<span className="mapMenuText">{this.props.menuItems[2]}</span>
					</label>
					<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" id={this.props.menuItems[2]} onClick={(event) => this.menuArrowClicked(event)} />
				</h2>
				{this.renderPeopleSubMenu()}
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
