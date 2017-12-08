import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {GoogleMap} from './GoogleMap';
import {ReviewableModal} from './ReviewableModal';
import 'whatwg-fetch'

const velocity = require('velocity-react');


export class MapComponent extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			markerClicked: false,
			activeMarker: -1,
			markers: this.props.marker_info
		}
	}

	componentDidMount() {
		this.buildMap('map', this.props.lat, this.props.long, this.props.zoom, this.props.marker_info);	
		$('.modal-close').on('click', function(){
			this.setState({markerClicked: false, activeMarker: -1});
			$('#reviewable-modal').toggleClass('active');
		}.bind(this));
	}

	loadMap(){
		buildMap('map', this.props.lat, this.props.long, this.props.zoom, this.props.marker_info);	
	}

	render() {
		let modal = [];
		if(this.state.markerClicked){
			let props = {
				id: 0,
				handleClick: this.closeModal.bind(this)
			}; //call requestReviewableDataFromServer
			modal = (<ReviewableModal {...props} />);
		}
		return (
			<div className="mapContainer">
				<div id='map'>

				</div>
				{modal}
			</div>
		
		);
	}

	buildMap(id, lat, long, zoom, marker_info) {
		jQuery(document).ready(function(){
			this.mapHeight();
			this.initMap();
		}.bind(this));
		jQuery(window).resize(function(){
			this.mapHeight();
		}.bind(this));

		this.id = id;
		this.lat = lat;
		this.long = long;
		this.zoom = zoom;
		this.marker_info = marker_info;
		this.markers = [];
	}

	mapHeight(){
		if(jQuery(window).width() > 769){
			let h = jQuery('#small-images .sign-image').height();
			jQuery('#' + this.id).css({
				width: '',
				height: h
			});
		}
	}

	initMap() {

		let lat = this.lat;
		let lng = this.long;
		let center = { lat , lng };
		let map = new google.maps.Map(document.getElementById(this.id), {
			center: center,
			scrollwheel: false,
			zoom: this.zoom	
		});
		
		this.initMarkers(map);

		google.maps.event.addDomListener(window, 'resize', function() {
			map.setCenter(center);
		});
	}

	initMarkers(map){
		for(let i = 0; i < this.marker_info.length; i++)
		{
			let mark = this.marker_info[i];
			let lat = mark.lat;
			let lng = mark.long;
			if(mark.hasOwnProperty('mark') && mark['mark'] != '')
			{
				let marker = new google.maps.Marker({
					position: {lat , lng },
					map: map,
					icon: mark['mark']
				});
				google.maps.event.addListener(marker, 'click', this.markerClick.bind(this));
				this.markers.push(marker);
			} else {
				let marker = new google.maps.Marker({
					position: {lat , lng },
					map: map
				});
				google.maps.event.addListener(marker, 'click', this.markerClick.bind(this));
				this.markers.push(marker);
			}
			
		}
	}

	markerClick(){
		this.setState({markerClicked: true, activeMarker: 1});
		jQuery('#reviewable-modal').toggleClass('active');
	}

	closeModal(){
		this.setState({markerClicked: false, activeMarker: -1});
		jQuery('#reviewable-modal').toggleClass('active');
	}
}