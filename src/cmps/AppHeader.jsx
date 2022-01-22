import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {loadBoards, addBoard} from '../store/board.action.js';
import {Link} from 'react-router-dom';
import boardsImg from '../assets/imgs/boards.svg';

// import {WorkSpace} from '../pages/WorkSpace.jsx';
// import {Board} from '../pages/Board.jsx';

import logo from '../assets/imgs/logo/logo.svg';

export function AppHeader() {
	const [isBoardsModalOpen, setBoardsModal] = useState(false);
	const [isCreateModalOpen, setCreateModal] = useState(false);
	const [isUserModalOpen, setUserModal] = useState(false);
	const {boards} = useSelector((state) => ({boards: state.boardModule.boards}), shallowEqual);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadBoards());
	}, []);

	const toggleModal = (type) => {
		type === 'boards' && setBoardsModal(!isBoardsModalOpen);
		type === 'create' && setCreateModal(!isCreateModalOpen);
		type === 'user' && setUserModal(!isUserModalOpen);
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
						<li className='boards'>
							<span className='li-span flex-center' onClick={() => toggleModal('boards')}>
								<img className='boards-img' src={boardsImg} alt='' />
								Boards
							</span>
							{isBoardsModalOpen && (
								<ul className='boards-modal flex'>
									<div className='modal-top'>
										Boards
										<button onClick={() => toggleModal('boards')}>x</button>
									</div>
									<hr></hr>
									{boards.map((board) => {
										return (
											<Link onClick={() => toggleModal('boards')} key={board._id} to={`/board/${board._id}`}>
												<li>{board.title}</li>
											</Link>
										);
									})}
								</ul>
							)}
						</li>
						<li className='create-li'>
							<span onClick={() => toggleModal('create')}>Create</span>
							{isCreateModalOpen && (
								<div className='create-modal flex'>
									<div className='modal-top'>
										Create
										<button onClick={() => toggleModal('create')}>x</button>
									</div>
									<hr></hr>
									<div
										onClick={() => {
											dispatch(addBoard());
											toggleModal('create');
										}}>
										<span>Create Board</span>
									</div>
								</div>
							)}
						</li>
					</ul>
					<div className='user-avatar'>
						<div
							className='user-avatar-btn flex-center'
							onClick={() => {
								toggleModal('user');
							}}>
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
			)} */}

			{/* {isCreateModalOpen && (
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
			{isUserModalOpen && (
				<div className='user-modal'>
					<div>
						<div className='modal-top'>
							<h3>Account</h3>
							<button onClick={() => toggleModal('user')}>x</button>
						</div>
						<hr />
						Logout
					</div>
				</div>
			)}
		</section>
	);
}
