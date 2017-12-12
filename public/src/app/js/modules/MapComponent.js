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
		 setTimeout( function() {
			this.buildMap('map', this.props.lat, this.props.long, this.props.zoom, this.props.marker_info);	
		}.bind(this), 100 );
		
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
		
		return (
			<div className="mapContainer">
				<div id='map'>

				</div>
				<velocity.VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
					{this.renderModal()}
				</velocity.VelocityTransitionGroup>
			</div>
		
		);
	}

	renderModal() {
		if(this.state.markerClicked){
			let props = {
				reviews: [
					{
						id: 0,
						rating: 1,
						username: 'Test',
						up_votes: 10,
						down_votes: 4,
						review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
					},
					{
						id: 1,
						rating: 3,
						username: 'Test',
						up_votes: 15,
						down_votes: 37,
						review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
					},
					{
						id: 2,
						rating: 2,
						username: 'Test',
						up_votes: 20,
						down_votes: 2,
						review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
					},
					{
						id: 2,
						rating: 2,
						username: 'Test',
						up_votes: 20,
						down_votes: 2,
						review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
					},

				],
				handleClick: this.closeModal.bind(this)
			}; //call requestReviewableDataFromServer
			return (<ReviewableModal {...props} />);
		}
	}

	buildMap(id, lat, long, zoom, marker_info) {
		this.id = id;
		this.lat = lat;
		this.long = long;
		this.zoom = zoom;
		this.marker_info = marker_info;
		this.markers = [];

		jQuery(document).ready(function(){
			this.mapHeight();
			this.initMap();
		}.bind(this));
		jQuery(window).resize(function(){
			this.mapHeight();
		}.bind(this));

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
		let myStyles =[
			{
				featureType: "poi",
				elementType: "labels",
				stylers: [
					{ visibility: "off" }
				]
			}
		];

		let map = new google.maps.Map(document.getElementById(this.id), {
			center: center,
			scrollwheel: false,
			zoom: this.zoom,
			styles: myStyles
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
			let infowindow = new google.maps.InfoWindow({
				content: '<h5 data-id="' + mark['id'] + '">' + mark['title'] + '</h5>'
			});
			let marker = null;
			if(mark.hasOwnProperty('mark') && mark['mark'] != '')
			{
				marker = new google.maps.Marker({
					position: {lat , lng },
					map: map,
					icon: mark['mark']
				});
			} else {
				marker = new google.maps.Marker({
					position: {lat , lng },
					map: map
				});
			}
			google.maps.event.addListener(marker, 'click', this.markerClick.bind(this));
			google.maps.event.addListener(marker, 'mouseover',  function() {
				infowindow.open(map, marker);
			}.bind(this));
			google.maps.event.addListener(marker, 'mouseout',  function() {
				infowindow.close(map, marker);
			}.bind(this));
			this.markers.push(marker);
			
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