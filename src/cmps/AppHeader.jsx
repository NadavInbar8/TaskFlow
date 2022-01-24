import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {loadBoards, addBoard, openModal} from '../store/board.action.js';
import {Link, useLocation} from 'react-router-dom';
import boardsImg from '../assets/imgs/boards.svg';

// import {WorkSpace} from '../pages/WorkSpace.jsx';
// import {Board} from '../pages/Board.jsx';

import logo from '../assets/imgs/logo/logo.svg';

export function AppHeader() {
	// const [isBoardsModalOpen, setBoardsModal] = useState(false);
	// const [isCreateModalOpen, setCreateModal] = useState(false);
	// const [isUserModalOpen, setUserModal] = useState(false);
	const {boards} = useSelector((state) => ({boards: state.boardModule.boards}), shallowEqual);
	const {board} = useSelector((state) => ({board: state.boardModule.currBoard}), shallowEqual);
	const {modal} = useSelector((state) => ({modal: state.boardModule.modal}));
	const [newBoard, setNewBoard] = useState({});
	const [boardTitleInput, setBoardTitleInput] = useState('');

	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		dispatch(loadBoards());
	}, []);

	const getbackgroundcolor = () => {
		if (location.pathname.includes('/board') && board) return 'rgba(0, 0, 0, 0.45)';
		// return `${board.style.backgroundColor}`;
		else if (location.pathname === '/') return 'lightcyan';
		else if (location.pathname.includes('/workspace')) return '#026aa7';
	};

	const toggleModal = (type) => {
		dispatch(openModal(type));
	};

	// New board Funcs
	const colors = [
		'bc-blue',
		'bc-orange',
		'bc-dark-green',
		'bc-red',
		'bc-purple',
		'bc-pink',
		'bc-light-green',
		'bc-cyan',
		'bc-grey',
	];

	const getColors = (color) => {
		if (color === 'bc-blue') return 'rgb(0, 121, 191)';
		else if (color === 'bc-orange') return 'rgb(210, 144, 52)';
		else if (color === 'bc-dark-green') return 'rgb(81, 152, 57)';
		else if (color === 'bc-red') return 'rgb(176, 70, 50)';
		else if (color === 'bc-purple') return 'rgb(137, 96, 158)';
		else if (color === 'bc-pink') return 'rgb(205, 90, 145)';
		else if (color === 'bc-light-green') return 'rgb(75, 191, 107)';
		else if (color === 'bc-cyan') return 'rgb(0, 174, 204)';
		else if (color === 'bc-grey') return 'rgb(131, 140, 145)';
	};

	const saveColor = (color) => {
		const actualColor = getColors(color);
		setNewBoard({...newBoard, backgroundColor: actualColor});
		console.log(newBoard);
	};

	const updateBoardTitle = () => {
		setNewBoard({...newBoard, title: boardTitleInput});
		console.log(newBoard);
	};

	const saveNewBoard = () => {
		dispatch(addBoard(newBoard));
	};

	function handleBoardTitleChange({target}) {
		if (!target) return;
		// console.log(target);
		const value = target.value;
		setBoardTitleInput(value);
	}

	// const getBackgroundOpacity = () => {
	// 	// if (location.pathname.includes('/board')) return '0.45';
	// 	// else if (location.pathname === '/') return 0.9;
	// 	// return '1';
	// };

	// const toggleModal = (type) => {
	// 	switch (type) {
	// 		case 'boards':
	// 			setBoardsModal(!isBoardsModalOpen);
	// 			setCreateModal(false);
	// 			setUserModal(false);
	// 			break;

	// 		case 'create':
	// 			setCreateModal(!isCreateModalOpen);
	// 			setBoardsModal(false);
	// 			setUserModal(false);
	// 			break;

	// 		case 'user':
	// 			setUserModal(!isUserModalOpen);
	// 			setBoardsModal(false);
	// 			setCreateModal(false);
	// 			break;
	// 		default:
	// 	}
	// };

	// style={{backgroundColor: '#0000003d'}}

	return (
		<header className='app-header' style={{backgroundColor: getbackgroundcolor()}}>
			<div className='main-header flex'>
				<div className='left-container flex'>
					<div className='logo-container flex align-center'>
						<Link to='/workspace'>
							<img src={logo} alt='taskflow logo' />
						</Link>
					</div>
					{/* <nav className='flex'> */}
					<ul>
						<li className='boards'>
							<span className='li-span flex-center' onClick={() => toggleModal('boardsModal')}>
								<img className='boards-img' src={boardsImg} alt='' />
								Boards
							</span>
							{modal === 'boardsModal' && (
								<ul className='boards-modal flex'>
									<div className='modal-top'>
										<h3>Boards</h3>
										<button onClick={() => toggleModal('boardsModal')}>x</button>
									</div>
									<hr></hr>
									{boards.map((board) => {
										return (
											<Link onClick={() => toggleModal('boardsModal')} key={board._id} to={`/board/${board._id}`}>
												<li>{board.title}</li>
											</Link>
										);
									})}
								</ul>
							)}
						</li>
						<li className='create-li'>
							<span onClick={() => toggleModal('createModal')}>Create</span>
							{modal === 'createModal' && (
								<div className='create-modal flex'>
									<div className='modal-top'>
										<h3>Create</h3>
										<button onClick={() => toggleModal('createModal')}>x</button>
									</div>
									<hr></hr>
									<div>
										<div className='board-background'>
											<span className='bold'>Background</span>
											<div className='colors-grid'>
												{colors.map((color, idx) => {
													return (
														<div
															onClick={() => saveColor(color)}
															key={idx}
															className={color + ' new-board-colors' + ' ' + 'flex' + ' ' + 'flex-center'}></div>
													);
												})}
											</div>
										</div>
										<div>
											<span>Board title</span>
											<input
												className='board-title'
												onBlur={updateBoardTitle}
												onChange={handleBoardTitleChange}
												name='title'
												value={boardTitleInput}
												type='text-area'
											/>
										</div>
										<span
											className='app-header-div'
											onClick={() => {
												toggleModal('createModal');
												saveNewBoard();
											}}>
											Create Board
										</span>
									</div>
								</div>
							)}
						</li>
					</ul>
				</div>
				<div className='user-avatar'>
					<div
						className='user-avatar-btn flex-center'
						onClick={() => {
							toggleModal('userModal');
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
				{/* </nav> */}
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
			{modal === 'userModal' && (
				<div className='user-modal'>
					<div>
						<div className='modal-top'>
							<h3>Account</h3>
							<button onClick={() => toggleModal('userModal')}>x</button>
						</div>
						<hr />
						Logout
					</div>
				</div>
			)}
		</header>
	);
}
