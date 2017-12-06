import * as React from 'react';
import { render } from 'react-dom';	


import { PracticeComp } from './modules/PracticeComp.js';
// import { RPToDo, IRPToDoProps } from './modules/RPToDo';

class App extends React.Component {


	render() {
		let props = {
			menuItems: ['Buildings', 'Classes', 'People']
		};
		return  (
			<PracticeComp {...props}/> 
		);
	}
}

render( <App />, document.getElementById('react-root'));