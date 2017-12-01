declare function require(name:string): any;

import * as React from 'react'

const velocity = require('velocity-react')

interface Body { has_modal: boolean; data_type: string;}

export interface IRPHeaderProps { body_data: Body; main_menu: string; page_headline: Array<string>; site_name: string; images_dir: string; header_id: string; body_text: string; headline_text: string; }
export interface IRPHeaderState { isMobile: boolean; menuItemIsActive: number; sliderPos: number}
export class RPHeader extends React.Component<IRPHeaderProps, IRPHeaderState> {
	constructor() {
		super()
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

	getLeft(elmId: string){
		var containerElem = document.getElementById('slider-container')
		var elem = document.getElementById(elmId)
		var rect = elem.getBoundingClientRect()
		var containerRect = containerElem.getBoundingClientRect()
		return rect.left - containerRect.left
	}

	componentDidMount() {
		document.getElementById('menu-item-1').onclick = this.activeInProgress.bind(this)
		document.getElementById('menu-item-2').onclick = this.activeCompleted.bind(this)
		document.getElementById('menu-item-3').onclick = this.activeDismissed.bind(this)
		window.onresize = this.resized.bind(this)
	}

	render() {

		return (
			<div>
				{this.renderHeader()}
			</div>
		)
	}

	renderHeader() {
		return (
			<header id={this.props.header_id} className="span_12">
				<div className="span_12 tabl hero">
					<div className="span_10 cell">
						<div id="headline" className="span_10 content">
							<div className="header-text">
								{this.renderHeadline(this.props.headline_text)}
								{this.renderHeaderText(this.props.body_text)}
							</div>
							{this.renderMenu()}
						</div>
					</div>
				</div>
				{this.renderMenuBottom()}
			</header>
		)
	}

	renderHeaderText(body_data: string){
		return (<p> {body_data} </p>)
	}

	renderHeadline(headline: string) {
		return (<h1> {headline} </h1>)
	}

	renderMenu(){
		return(
			<div id="main-menu" className="mobile-hide">
				<div id="menu-item-1" className="span_4 colWrap menu-item">
					<h5> In Progress </h5>
				</div><div id="menu-item-2" className="span_4 colWrap menu-item">
					<h5> Completed </h5>
				</div><div id="menu-item-3" className="span_4 colWrap menu-item">
					<h5> Dismissed </h5>
				</div>
			</div>)
	}

	renderMenuBottom(){
		var showMenu = true

		return(
			<div className="span_12 tabl hero menu-bottom mobile-hide">
				<div className="span_10 cell">
					<div id="slider-container" className="span_10 content">
						<velocity.VelocityComponent animation={{ left: this.state.sliderPos }} duration={ 250 } >
							<div className="span_4 colWrap menu-bottom active"></div>
						</velocity.VelocityComponent>
					</div>
				</div>
			</div>)
	}

	activeInProgress() {
		this.setState({ menuItemIsActive: 1 })
		this.setState({ sliderPos : this.getLeft('menu-item-1')})
	}
	activeCompleted() {
		this.setState({ menuItemIsActive: 2 })
		this.setState({ sliderPos : this.getLeft('menu-item-2')})
	}
	activeDismissed() {
		this.setState({ menuItemIsActive: 3 })
		this.setState({ sliderPos : this.getLeft('menu-item-3')})
	}
	resized() {
		if(this.state.menuItemIsActive == 1) {
			this.setState({ sliderPos : this.getLeft('menu-item-1')})
		} else if(this.state.menuItemIsActive == 2) {
			this.setState({ sliderPos : this.getLeft('menu-item-2')})
		} else if(this.state.menuItemIsActive == 3) {
			this.setState({ sliderPos : this.getLeft('menu-item-3')})
		}
	}
}