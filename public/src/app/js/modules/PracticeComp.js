import * as React from 'react';

const velocity = require('velocity-react');


export class PracticeComp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			menuArrowArr:["two", "three"],
			idVal:"1"
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
		if (this.state.menuArrowArr.includes(string))
		{
			/*the menu is open - close it.*/
			let index = array.indexOf(string);
			array.splice(index, 1);
		}
		else
		{
			/*the menu is closed - open it.*/
			array.push(string);
		}
		this.setState({menuArrowArr, array});
	}

	incrementNumber() {
		let num=parseInt(this.state.idVal);
		num++;
		let retVal=num.toString();
		this.state.idVal=retVal;
	}

	renderBuildingSubMenu() {
		if (this.state.menuArrowArr.includes("one"))
		{
			return(
					<h3>
						<label className="container" for="XXXstring" >
		  				<input type="checkbox" name="XXXstring" />
		  				<span className="checkmark"></span>
							<span className="mapMenuText">Building option #1</span>
						</label>
						<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" />
					</h3>
			)
		}
	}

	renderClassesSubMenu() {
		if (this.state.menuArrowArr.includes("two"))
		{
			return(
					<h3>
						<label className="container" for="XXXstring" >
		  				<input type="checkbox" name="XXXstring" />
		  				<span className="checkmark"></span>
							<span className="mapMenuText">Classes option #1</span>
						</label>
						<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" />
					</h3>
			)
		}
	}

	renderPeopleSubMenu() {
		if (this.state.menuArrowArr.includes("three"))
		{
			return(
					<h3>
						<label className="container" for="XXXstring" >
		  				<input type="checkbox" name="XXXstring" />
		  				<span className="checkmark"></span>
							<span className="mapMenuText">People option #1</span>
						</label>
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
				<label className="container" for='check1'>
  				<input type="checkbox" name='check1' />
  				<span className="checkmark"></span>
					<span className="mapMenuText">{this.props.menuItems[0]}</span>
				</label>
				{this.incrementNumber()}
				<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" id={this.state.idVal} onClick={(event) => this.menuArrowClicked(event)} />
				{this.incrementNumber()}
			</h2>
			{this.renderBuildingSubMenu()}
			<h2>
				<label className="container" for='check2'>
  				<input type="checkbox" name='check2' />
  				<span className="checkmark"></span>
					<span className="mapMenuText">{this.props.menuItems[1]}</span>
				</label>
				<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" />
			</h2>
			{this.renderClassesSubMenu()}
			<h2>
				<label className="container" for='check3'>
  				<input type="checkbox" name='check3' />
  				<span className="checkmark"></span>
					<span className="mapMenuText">{this.props.menuItems[2]}</span>
				</label>
				<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" />
			</h2>
			{this.renderPeopleSubMenu()}
			<div className="mapMenuButton"><button> Make A Rating</button></div>
		</div>
		)
	}
}
