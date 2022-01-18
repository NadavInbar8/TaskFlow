import React from 'react';
// import {CardDetails} from './CardDetails.jsx';
import {Link, Route, Switch} from 'react-router-dom';

export class Board extends React.Component {
	render() {
		return (
			<selection>
				{/* <Route component={() => <CardDetails />} path='/board/carddetails' /> */}

				<Link to='/board/carddetails'>to card details</Link>
				<div>
					<h1>board</h1>
				</div>
			</selection>
		);
	}
}
