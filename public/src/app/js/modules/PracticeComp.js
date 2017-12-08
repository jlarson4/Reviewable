import * as React from 'react';

const velocity = require('velocity-react');


export class PracticeComp extends React.Component {
	constructor(props) {
		super(props)
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

	render() {

		return (
			<div>
				{this.props.menuItems}
			</div>
		)
	}
}