import React from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import routes from './routes.js';
import {AppHeader} from './cmps/AppHeader.jsx';

export function RootCmp() {
	const {board} = useSelector((state) => ({board: state.boardModule.currBoard}), shallowEqual);
	const location = useLocation();

	const getbackgroundcolor = () => {
		// return `${board.style.backgroundColor}`;
		if (location.pathname === '/') return 'lightcyan';
		else if (location.pathname.includes('/board') && board) return board.style.backgroundColor;
	};

	const getHeaderColor = () => {
		if (location.pathname.includes('/board') && board) return 'rgba(0, 0, 0, 0.45)';
		else if (location.pathname.includes('/workspace')) return '#026aa7';
	};

	return (
		<div>
			<main style={{backgroundColor: getbackgroundcolor()}}>
				<AppHeader style={{backgroundColor: getHeaderColor()}} />
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
