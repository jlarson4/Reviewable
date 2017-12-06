import * as React from 'react';

const velocity = require('velocity-react');


export class PracticeComp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {buildingsState:"closed" classesState:"closed", peopleState:"closed"}
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

	checkClicked() {
		if (document.getElementByName("Buildings").checked = true)
		{
			{document.getElementByName("Buildings").checked = false};
		}
		else
		{
			{document.getElementByName("Buildings").checked = ""};
		}
	}

	render() {
		//let arr=[];
		//for (let i=0; i < this.props.menuItems.length; i++)
		//{
		//	arr.push(<h1>{this.props.menuItems[i]}</h1>);
		//}
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
			<h2> 
				<label className="container">
  				<input type="checkbox" />
  				<span className="checkmark"></span>
				</label>
				<span className="mapMenuText">{this.props.menuItems[1]}</span>
				<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" /> 
			</h2>
			<h2> 
				<label className="container">
  				<input type="checkbox" />
  				<span className="checkmark"></span>
				</label>
				<span className="mapMenuText">{this.props.menuItems[2]}</span>
				<img src="closemenu.png" alt="arrow" height="42" width="42" className="mapMenuArrow" /> 
			</h2>
			<div className="mapMenuButton"><button> Make A Rating</button></div>
		</div>
		)
	}
}