import * as React from 'react';
import { render } from 'react-dom';	
import 'whatwg-fetch'

export class ReviewableModal extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		
		return  (
			<div id="reviewable-modal" className='modal'>
				<div className="reviewable-content">
					<a className="modal-close" onClick={this.props.handleClick}>
					</a>
				</div>
			</div> 
		);
	}
}