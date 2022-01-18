import React from 'react';
import {Link} from 'react-router-dom';

import {WorkSpace} from '../pages/WorkSpace.jsx';
import {Board} from '../pages/Board.jsx';

import logo from '../assets/imgs/logo.jpg';

export function AppHeader() {
	return (
		<div className='app-header'>
			<div className='main-header'>
				<div className='logo-container'>
					<Link to='/workspace'>
						<img src={logo} alt='taskflow logo' />
					</Link>
				</div>
				<nav>
					<ul>
						<Link to='/board'>
							<li className='board'>Board</li>
						</Link>
					</ul>
				</nav>
			</div>
		</div>
	);
}
