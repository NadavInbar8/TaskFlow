import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/main.scss';
import {RootCmp} from './RootCmp.jsx';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from './store/store.js';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<RootCmp />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
