import * as React from 'react';

const velocity = require('velocity-react');


export class PracticeComp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {buildingsState:"closed", classesState:"closed", peopleState:"closed"}
		this.renderBuildingSubMenu = this.renderBuildingSubMenu.bind(this);
		this.renderClassesSubMenu = this.renderClassesSubMenu.bind(this);
		this.renderPeopleSubMenu = this.renderPeopleSubMenu.bind(this);
		let isMobile = false
		if (window.innerWidth < 770) {
			isMobile = true
		}

		this.state = {
			isMobile: isMobile,
			menuItemIsActive: 1,
			sliderPos: 0,
		}
	}

	renderBuildingSubMenu() {
		if (this.state.buildingsState=="open")
		{
			return(
				
					<h3>
						<label className="container">
		  				<input type="checkbox" />
		  				<span className="checkmark"></span>
						</label>				
						<span className="mapMenuText">Building option #1</span>
						<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" /> 				
					</h3>
			)
		}
	}

	renderClassesSubMenu() {
		if (this.state.classesState=="open")
		{
			return(
				
					<h3>
						<label className="container">
		  				<input type="checkbox" />
		  				<span className="checkmark"></span>
						</label>				
						<span className="mapMenuText">Classes option #1</span>
						<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" /> 				
					</h3>
			)
		}
	}

	renderPeopleSubMenu() {
		if (this.state.peopleState=="open")
		{
			return(
				
					<h3>
						<label className="container">
		  				<input type="checkbox" />
		  				<span className="checkmark"></span>
						</label>				
						<span className="mapMenuText">Classes option #1</span>
						<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" /> 				
					</h3>
			)
		}
	}

	render() {
		return (
		<div className="mapMenu">
				<div className="mapMenuSearchBar"><input type="text" name="search" placeholder="Search..." /></div>
				
				
			<h2> 
				<label className="container">
  				<input type="checkbox" />
  				<span className="checkmark"></span>
				</label>				
				<span className="mapMenuText">{this.props.menuItems[0]}</span>
				<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" /> 
			</h2>
			{this.renderBuildingSubMenu()}
			<h2> 
				<label className="container">
  				<input type="checkbox" />
  				<span className="checkmark"></span>
				</label>
				<span className="mapMenuText">{this.props.menuItems[1]}</span>
				<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" /> 
			</h2>
			{this.renderClassesSubMenu()}
			<h2> 
				<label className="container">
  				<input type="checkbox" />
  				<span className="checkmark"></span>
				</label>
				<span className="mapMenuText">{this.props.menuItems[2]}</span>
				<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" /> 
			</h2>
			{this.renderPeopleSubMenu()}
			<div className="mapMenuButton"><button> Make A Rating</button></div>
		</div>
		)
	}
}