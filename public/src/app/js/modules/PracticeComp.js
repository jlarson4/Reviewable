import * as React from 'react';

import { UserModal } from './UserModal.js';

const velocity = require('velocity-react');


export class PracticeComp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			menuArrowArr:[],
			userModal: false
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
					<h3>
						<label className="container2" htmlFor="XXXstring" >
		  				<input type="checkbox" name="XXXstring" />
		  				<span className="checkmark"></span>
							<span className="mapMenuText">DSC</span>
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
				<label className="container3" htmlFor="XXXstring" >
					<input type="checkbox" name="XXXstring" />
					<span className="checkmark"></span>
					<span className="mapMenuText">199</span>
				</label>
				<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow3" id="199" onClick={(event) => this.menuArrowClicked(event)} />
			</h4>
		)
	}

	renderClassesSubMenu() {
		if (this.state.menuArrowArr.includes("Classes"))
		{
			return(
					<h3>
						<label className="container2" htmlFor="XXXstring" >
		  				<input type="checkbox" name="XXXstring" />
		  				<span className="checkmark"></span>
							<span className="mapMenuText">Boring Shit</span>
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
					<h3>
						<label className="container2" htmlFor="XXXstring" >
		  				<input type="checkbox" name="XXXstring" />
		  				<span className="checkmark"></span>
							<span className="mapMenuText">That one fucking botch who i hate with a passion</span>
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

				<h2>
					<label className="container" htmlFor='check1'>
	  				<input type="checkbox" name='check1' defaultChecked='checked'/>
	  				<span className="checkmark"></span>
						<span className="mapMenuText">{this.props.menuItems[0]}</span>
					</label>
					<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" id={this.props.menuItems[0]} onClick={(event) => this.menuArrowClicked(event)} />
				</h2>
				{this.renderBuildingSubMenu()}
				<h2>
					<label className="container" htmlFor='check2'>
	  				<input type="checkbox" name='check2' />
	  				<span className="checkmark"></span>
						<span className="mapMenuText">{this.props.menuItems[1]}</span>
					</label>
					<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" id={this.props.menuItems[1]} onClick={(event) => this.menuArrowClicked(event)} />
				</h2>
				{this.renderClassesSubMenu()}
				<h2>
					<label className="container" htmlFor='check3'>
	  				<input type="checkbox" name='check3' />
	  				<span className="checkmark"></span>
						<span className="mapMenuText">{this.props.menuItems[2]}</span>
					</label>
					<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" id={this.props.menuItems[2]} onClick={(event) => this.menuArrowClicked(event)} />
				</h2>
				{this.renderPeopleSubMenu()}
				<div className="mapMenuButton"><button> Make A Rating</button></div>
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
		}
	}

	toggleUserModal(){
		this.setState({userModal: !this.state.userModal})
	}
}
