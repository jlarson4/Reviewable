import * as React from 'react';
import { render } from 'react-dom';	


import { MapComponent } from './modules/MapComponent.js';
import { GoogleMap } from './modules/GoogleMap.js';

class App extends React.Component {


	render() {
		
		let props = {
			marker_info: [
				{
					lat: 42.587664,
					long: -87.856703
				},
				{
					lat: 42.603724,
					long: -87.846253
				},
				{
					lat: 42.576543,
					long: -87.833120
				}
			],
			zoom: 12,
			lat: 42.587664,
			long: -87.856703
		};
		return  (
			<MapComponent {...props}/> 
		);
	}
}


render( <App />, document.getElementById('react-root'));

