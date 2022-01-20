import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {loadBoards, addBoard} from '../store/board.action.js';
import {Link} from 'react-router-dom';
import boardsImg from '../assets/imgs/boards.svg';

// import {WorkSpace} from '../pages/WorkSpace.jsx';
// import {Board} from '../pages/Board.jsx';

import logo from '../assets/imgs/logo/logo.svg';

export function AppHeader() {
	let [isBoardsModalOpen, setBoardsModal] = useState(false);
	let [isCreateModalOpen, setCreateModal] = useState(false);
	let [isUserModalOpen, setUserModal] = useState(false);
	const {boards} = useSelector((state) => ({boards: state.boardModule.boards}), shallowEqual);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadBoards());
	}, []);

	const toggleModal = (type) => {
		type === 'boards' && setBoardsModal((isBoardsModalOpen = !isBoardsModalOpen));
		type === 'create' && setCreateModal((isCreateModalOpen = !isCreateModalOpen));
		type === 'user' && setUserModal((isUserModalOpen = !isUserModalOpen));
		console.log(isUserModalOpen);
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
						<li className='boards' onClick={() => toggleModal('boards')}>
							<img className='boards-img' src={boardsImg} alt='' />
							Boards
						</li>
						<li className='create-li' onClick={() => toggleModal('create')}>
							Create
						</li>
					</ul>
					{/* {isBoardsModalOpen && (
						<ul className='boards-modal flex'>
							{boards.map((board) => {
								return (
									<Link onClick={() => toggleModal('boards')} key={board._id} to={`/board/${board._id}`}>
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
									dispatch(addBoard());
									toggleModal('create');
								}}>
								<span>Create Board</span>
							</div>
						</div>
					)} */}

					<div className='user-avatar'>
						<div
							onClick={() => {
								toggleModal('user');
							}}
							className='user-avatar-btn'>
							G
						</div>
						{/* {isUserModalOpen && (
							<div className='user-modal'>
								<span
									onClick={() => {
										toggleModal('user');
									}}>
									logout
								</span>
							</div>
						)} */}
					</div>
				</nav>
			</div>
			{isBoardsModalOpen && (
				<ul className='boards-modal flex'>
					{boards.map((board) => {
						return (
							<Link onClick={() => toggleModal('boards')} key={board._id} to={`/board/${board._id}`}>
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
							dispatch(addBoard());
							toggleModal('create');
						}}>
						<span>Create Board</span>
					</div>
				</div>
			)}
			{isUserModalOpen && (
				<div className='user-modal'>
					<span
						onClick={() => {
							toggleModal('user');
						}}>
						logout
					</span>
				</div>
			)}
		</section>
	);
}
