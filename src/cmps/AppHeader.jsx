import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {loadBoards} from '../store/board.action.js';
import {Link} from 'react-router-dom';

// import {WorkSpace} from '../pages/WorkSpace.jsx';
// import {Board} from '../pages/Board.jsx';

import logo from '../assets/imgs/logo/logo.svg';

export function _AppHeader({loadBoards, boards}) {
	const [stateBoards, setBoards] = useState([]);
	let [isBoardsModalOpen, setBoardsModal] = useState(false);

	useEffect(async () => {
		await loadBoards();
		setBoards(boards);
	}, []);

	useEffect(() => {
		console.log(stateBoards);
	}, [stateBoards]);

	const openBoardsModal = () => {
		setBoardsModal((isBoardsModalOpen = !isBoardsModalOpen));
	};

	return (
		<div className='app-header'>
			<div className='main-header'>
				<div className='logo-container'>
					<Link to='/workspace'>
						<img src={logo} alt='taskflow logo' />
					</Link>
				</div>
				<nav className='flex'>
					<ul>
						<li className='boards' onClick={() => openBoardsModal()}>
							Boards
						</li>
					</ul>
					{isBoardsModalOpen && (
						<ul className='boards-modal'>
							{boards.map((board) => {
								return (
									<Link key={board._id} to={`/board/${board._id}`}>
										<li>{board.title}</li>
									</Link>
								);
							})}
						</ul>
					)}
					<div className='user-avatar'>
						<div className='user-avatar-btn'>G</div>
					</div>
				</nav>
			</div>
		</div>
	);
}

function mapStateToProps({boardModule}) {
	return {
		boards: boardModule.boards,
	};
}

const mapDispatchToProps = {
	loadBoards,
};

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader);
