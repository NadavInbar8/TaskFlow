import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {loadBoards, addBoard, openModal} from '../store/board.action.js';
import {setUser} from '../store/user.action.js';
import {Link, useLocation, useHistory} from 'react-router-dom';
import boardsImg from '../assets/imgs/boards.svg';

// import {WorkSpace} from '../pages/WorkSpace.jsx';
// import {Board} from '../pages/Board.jsx';
import {CreateModal} from './headerCmps/CreateModal.jsx';

import whiteLogo from '../assets/imgs/logo/whiteLogo.svg';
import blackLogo from '../assets/imgs/logo/blackLogo.svg';

export function AppHeader() {
	// const [isBoardsModalOpen, setBoardsModal] = useState(false);
	// const [isCreateModalOpen, setCreateModal] = useState(false);
	// const [isUserModalOpen, setUserModal] = useState(false);
	const {boards} = useSelector((state) => ({boards: state.boardModule.boards}), shallowEqual);
	const {board} = useSelector((state) => ({board: state.boardModule.currBoard}), shallowEqual);
	const {modal} = useSelector((state) => ({
		modal: state.boardModule.modal,
	}));
	const {loggedInUser} = useSelector((state) => ({
		loggedInUser: state.userModule.loggedInUser,
	}));

	// const [newBoard, setNewBoard] = useState({});
	// const [boardTitleInput, setBoardTitleInput] = useState('');

	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	// const user = null;

	useEffect(() => {
		dispatch(loadBoards());
	}, []);

	const getBackgroundcolor = () => {
		if (location.pathname.includes('/board') && board) return 'rgba(0, 0, 0, 0.45)';
		// return `${board.style.backgroundColor}`;
		else if (location.pathname === '/') return 'rgba(0, 0, 0, 0)';
		else if (location.pathname.includes('/workspace')) return '#026aa7';
	};

	const getOpacity = () => {
		if (location.pathname === '/') return '1';
		else return '1';
	};

	const getFontColor = () => {
		if (location.pathname === '/') return '#172b4';
		else return '#ffff';
	};

	const toggleModal = (type) => {
		dispatch(openModal(type));
	};

	const onLogOut = async () => {
		dispatch(setUser(null, 'login'));
		window.location.replace('/login');
	};

	const getBackground = (board) => {
		// return `${board.style.backgroundColor}`;
		// if (location.pathname === '/') return 'lightcyan';

		return board.style.userClicked ? board.style.backgroundColor : `url(${board.style.previewImgUrl})`;
		// console.log(background);
		// return background;
	};

	// New board Funcs
	// const colors = [
	// 	'bc-blue',
	// 	'bc-orange',
	// 	'bc-dark-green',
	// 	'bc-red',
	// 	'bc-purple',
	// 	'bc-pink',
	// 	'bc-light-green',
	// 	'bc-cyan',
	// 	'bc-grey',
	// ];

	// const getColors = (color) => {
	// 	if (color === 'bc-blue') return 'rgb(0, 121, 191)';
	// 	else if (color === 'bc-orange') return 'rgb(210, 144, 52)';
	// 	else if (color === 'bc-dark-green') return 'rgb(81, 152, 57)';
	// 	else if (color === 'bc-red') return 'rgb(176, 70, 50)';
	// 	else if (color === 'bc-purple') return 'rgb(137, 96, 158)';
	// 	else if (color === 'bc-pink') return 'rgb(205, 90, 145)';
	// 	else if (color === 'bc-light-green') return 'rgb(75, 191, 107)';
	// 	else if (color === 'bc-cyan') return 'rgb(0, 174, 204)';
	// 	else if (color === 'bc-grey') return 'rgb(131, 140, 145)';
	// };

	// const saveColor = (color) => {
	// 	const actualColor = getColors(color);
	// 	setNewBoard({...newBoard, backgroundColor: actualColor});
	// 	console.log(newBoard);
	// };

	// const updateBoardTitle = () => {
	// 	setNewBoard({...newBoard, title: boardTitleInput});
	// 	console.log(newBoard);
	// };

	// const saveNewBoard = () => {
	// 	dispatch(addBoard(newBoard));
	// };

	// function handleBoardTitleChange({target}) {
	// 	if (!target) return;
	// 	// console.log(target);
	// 	const value = target.value;
	// 	setBoardTitleInput(value);
	// }

	// const getUserInitials = () => {
	// 	if (loggedInUser) {
	// 		let fullName = loggedInUser.fullName;
	// 		// console.log(fullName);
	// 		fullName = fullName.split(' ');
	// 		const initials = fullName[0].charAt(0).toUpperCase() + fullName[1].charAt(0).toUpperCase();
	// 		return initials;
	// 	}
	// };

	// const getBorderColor = () => {
	// 	if (boardTitleInput.length === 0) return 'red';
	// 	return 'grey';
	// };

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
		<>
			{location.pathname !== '/login' && location.pathname !== '/signup' && (
				<header
					className='app-header'
					style={{
						opacity: getOpacity(),
						backgroundColor: getBackgroundcolor(),
						color: getFontColor(),
					}}>
					<div className='main-header flex'>
						<div className='left-container flex'>
							<div className='logo-container flex align-center'>
								<Link to='/workspace'>
									<img src={location.pathname === '/' ? blackLogo : whiteLogo} alt='taskflow logo' />
								</Link>
							</div>
							{/* <nav className='flex'> */}
							{location.pathname !== '/' && (
								<ul>
									<li className='boards'>
										<span className='li-span flex-center' onClick={() => toggleModal('boardsModal')}>
											<img className='boards-img' src={boardsImg} alt='' />
											Boards
										</span>
										{modal === 'boardsModal' && (
											<ul className='boards-modal flex'>
												<div className='modal-top'>
													<span>Boards</span>
													<button onClick={() => toggleModal()}>x</button>
												</div>
												<hr></hr>
												{boards.map((board) => {
													return (
														<li
															key={board._id}
															onClick={() => {
																toggleModal('boardsModal');
																history.push(`/board/${board._id}`);
															}}>
															<div
																className='board-modal-img board-background-img align-center preview-cover'
																style={
																	board?.style?.userClicked
																		? {backgroundColor: getBackground(board)}
																		: {backgroundImage: getBackground(board)}
																}></div>
															<span>{board.title}</span>
														</li>
													);
												})}
											</ul>
										)}
									</li>
									<li className='create-li'>
										<span onClick={() => toggleModal('createModal')}>Create</span>
										{modal === 'createModal' && <CreateModal />}
										{/* (
									<div className='create-modal flex'>
										<div className='modal-top'>
											<h3>Create</h3>
											<button onClick={() => toggleModal('createModal')}>x</button>
										</div>
										<hr></hr>
										<div>
											<div className='board-background'>
												<h5>Background</h5>
												<div className='colors-grid m-y-m'>
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
											<div className='create-board-title-div'>
												<h5>Board title</h5>
												<input
													className='board-title-header m-y-m'
													onBlur={updateBoardTitle}
													onChange={handleBoardTitleChange}
													name='title'
													value={boardTitleInput}
													type='text-area'
													style={{borderColor: getBorderColor()}}
												/>
												{boardTitleInput.length === 0 && <span>👋 Board title is required</span>}
											</div>
											{boardTitleInput.length === 0 ? (
												<button disabled className='grey-btn disabled-btn create-board-btn m-y-m'>
													Create Board
												</button>
											) : (
												<button
													className='blue-btn enabled-btn create-board-btn m-y-m'
													onClick={() => {
														toggleModal('createModal');
														saveNewBoard();
													}}>
													Create Board
												</button>
											)} */}
										{/* </div> */}
										{/* </div> */}
										{/* )} */}
									</li>
								</ul>
							)}
						</div>
						{location.pathname === '/' ? (
							<div>
								<Link to='/login'>
									<button className='login-btn blue-btn'>Login</button>
								</Link>
								<Link to='/signup'>
									<button className='signup-btn blue-btn'>Signup</button>
								</Link>
							</div>
						) : (
							<div className='user-avatar'>
								<div
									className='user-avatar-btn flex-center'
									onClick={() => {
										toggleModal('userModal');
									}}>
									{loggedInUser ? loggedInUser.initials : 'G'}
								</div>
							</div>
						)}
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
									<span>Account</span>
									<button onClick={() => toggleModal()}>x</button>
								</div>
								<hr />
								{loggedInUser ? (
									<div>
										<div className='user-details flex'>
											<div className='user-avatar-btn flex-center m-y-m'>
												{loggedInUser.img ? <img src={loggedInUser.imgUrl} alt='' /> : <h4>{loggedInUser.initials}</h4>}
											</div>
											<div className='user-details-text'>
												<span className='user-fullname'>{loggedInUser.fullName}</span>
												<br></br>
												<span className='user-mail-or-username'>
													{loggedInUser.email ? loggedInUser.email : loggedInUser.username}
												</span>
											</div>
										</div>
										<span
											className='logout pointer'
											onClick={() => {
												onLogOut();
											}}>
											Logout
										</span>
									</div>
								) : (
									<div className='flex flex-start'>
										<div className='user-avatar flex-column'>
											<div className='user-avatar-btn flex-center m-y-m'>
												<h2>G</h2>
											</div>
											<Link to='/login'>
												<span className='logout pointer'>Login</span>
											</Link>
										</div>
									</div>
								)}
							</div>
						</div>
					)}
				</header>
			)}
		</>
	);
}
