import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {GoogleMap} from './GoogleMap';

const velocity = require('velocity-react');


export class MapComponent extends React.Component {
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

	componentDidMount() {
		this.loadMap();
	}

	loadMap(){

		let new_map = new GoogleMap('map', this.props.lat, this.props.long, this.props.zoom, this.props.marker_info);	
	}

	render() {
		return (
			<div id='map'>

			</div>
		
		);
	}
}