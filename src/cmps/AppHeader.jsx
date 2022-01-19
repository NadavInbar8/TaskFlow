import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {loadBoards, addBoard} from '../store/board.action.js';
import {Link} from 'react-router-dom';

// import {WorkSpace} from '../pages/WorkSpace.jsx';
// import {Board} from '../pages/Board.jsx';

import logo from '../assets/imgs/logo/logo.svg';

function _AppHeader({loadBoards, boards, addBoard}) {
	const [stateBoards, setBoards] = useState([]);
	let [isBoardsModalOpen, setBoardsModal] = useState(false);
	let [isCreateModalOpen, setCreateModal] = useState(false);

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

	const openCreateModal = () => {
		setCreateModal((isCreateModalOpen = !isCreateModalOpen));
	};

	return (
		<section className='app-header'>
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
						<li className='create' onClick={() => openCreateModal()}>
							Create
						</li>
					</ul>
					{isBoardsModalOpen && (
						<ul className='boards-modal flex'>
							{boards.map((board) => {
								return (
									<Link key={board._id} to={`/board/${board._id}`}>
										<li>{board.title}</li>
									</Link>
								);
							})}
						</ul>
					)}

					{isCreateModalOpen && (
						<div className='create-modal flex'>
							<div
								onClick={() => {
									addBoard();
								}}>
								Create Board
							</div>
						</div>
					)}

					<div className='user-avatar'>
						<div className='user-avatar-btn'>G</div>
					</div>
				</nav>
			</div>
		</section>
	);
}

function mapStateToProps({boardModule}) {
	return {
		boards: boardModule.boards,
	};
}

const mapDispatchToProps = {
	loadBoards,
	addBoard,
};

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader);
