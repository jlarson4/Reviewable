import * as React from 'react';
import { render } from 'react-dom';	


// import { RPHeader, IRPHeaderProps } from './modules/RPHeader';
// import { RPToDo, IRPToDoProps } from './modules/RPToDo';

class App extends React.Component {


	render() {
		//let w = window;
		return  (
			<p> This is a react app.. YAS IT WORKS.. and webpack is watching </p> 
		);
	}

	// renderContent(props) {
	// 	switch (props.data.page_template) {
 //      		case 'home-content': return <RPToDo {...props.data} />
	// 		default: return <div></div>
	// 	}
	// }
}


render( <App />, document.getElementById('react-root'));