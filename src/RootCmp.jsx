import React from 'react';
import {Switch, Route} from 'react-router-dom';
import routes from './routes.js';
import {AppHeader} from './cmps/AppHeader.jsx';
export function RootCmp() {
	return (
		<div>
			<main>
				<AppHeader />
				<Switch>
					{routes.map((route) => (
						<Route key={route.path} component={route.component} path={route.path} />
					))}
				</Switch>
			</main>
		</div>
	);
}

// function mapStateToProps({ toyModule }) {
//     return {
//       isModalShown: toyModule.isModalShown,
//     };
//   }

//   const mapDispatchToProps = {
//     toggleModal,
//   };

//   export const RootCmp = connect(mapStateToProps, mapDispatchToProps)(_RootCmp);
