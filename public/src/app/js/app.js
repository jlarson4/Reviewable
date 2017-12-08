import * as React from 'react';
import { render } from 'react-dom';	
import 'whatwg-fetch'


import { MapComponent } from './modules/MapComponent.js';
import { GoogleMap } from './modules/GoogleMap.js';

class App extends React.Component {


	render() {
		this.requestReviewableDataFromServer();
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

	requestReviewableDataFromServer(){
		let categories = {
			category: ['building', 'people', 'classes'],
			sub_category: [],
			title: [],
			school_id: 0

		}
		let marker_info = null;
		let data = new FormData();
		data.append( "json", JSON.stringify( categories ) );
		fetch('/getpins', {
			method: 'POST',
			body: data
		}).then(function(response: any){
			response.json().then(function(result: any){
				console.log(result);
			}.bind(this))
		}.bind(this))
	}
}


render( <App />, document.getElementById('react-root'));

