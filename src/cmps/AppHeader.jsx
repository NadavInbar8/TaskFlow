import React, {useLayoutEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import boardsImg from '../assets/imgs/boards.svg';

// Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {loadBoards, openModal} from '../store/board.action.js';
import {setUser, setUsers} from '../store/user.action.js';

// Modals
import {CreateModal} from './headerCmps/CreateModal.jsx';
import {BoardsModal} from './headerCmps/BoardsModal';
import {UserModal} from './headerCmps/UserModal';

import whiteLogo from '../assets/imgs/logo/whiteLogo.svg';
import blackLogo from '../assets/imgs/logo/blackLogo.svg';

// Services
import {userService} from '../services/user.service.js';

export function AppHeader() {
	const {board} = useSelector((state) => ({board: state.boardModule.currBoard}), shallowEqual);
	const {modal} = useSelector((state) => ({
		modal: state.boardModule.modal,
	}));
	const {loggedInUser} = useSelector((state) => ({
		loggedInUser: state.userModule.loggedInUser,
	}));

	const dispatch = useDispatch();
	const location = useLocation();

	useLayoutEffect(() => {
		if (location.pathname !== '/') dispatch(loadBoards());
		loadUsers();
		loadUser();
	}, []);

	const getBackgroundcolor = () => {
		if (location.pathname.includes('/board') && board) return 'rgba(0, 0, 0, 0.45)';
		else if (location.pathname === '/') return 'rgba(0, 0, 0, 0)';
		else if (location.pathname.includes('/workspace')) return '#026aa7';
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
		window.location.replace('/');
	};

	const loadUsers = async () => {
		const users = await userService.getUsers();
		dispatch(setUsers(users));
	};

	const loadUser = async () => {
		let user = await userService.getLoggedinUser();
		if (!user) user = await userService.connectGuestUser();
		dispatch(setUser(user, 'login'));
	};

	return (
		<>
			{location.pathname !== '/login' && location.pathname !== '/signup' && (
				<header
					className='app-header'
					style={{
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
							{location.pathname !== '/' && (
								<ul>
									<li className='boards'>
										<span className='li-span flex-center app-header-span' onClick={() => toggleModal('boardsModal')}>
											<img className='boards-img' src={boardsImg} alt='' />
											Boards
										</span>
										{modal === 'boardsModal' && <BoardsModal />}
									</li>
									<li className='create-li'>
										<span className='app-header-span' onClick={() => toggleModal('createModal')}>
											Create
										</span>
										{modal === 'createModal' && <CreateModal loggedInUser={loggedInUser} />}
									</li>
								</ul>
							)}
						</div>
						{location.pathname === '/' ? (
							<div className='login-signup-buttons-div flex align-center'>
								<Link to='/login'>
									<span className='login-btn'>Log in</span>
								</Link>
								<Link to='/signup'>
									<button className='signup-btn blue-btn'>Sign up</button>
								</Link>
							</div>
						) : (
							<div className='user-profile-div'>
								{loggedInUser?.imgUrl ? (
									<div
										className='user-avatar'
										onClick={() => {
											toggleModal('userModal');
										}}>
										<img className='user-avatar-btn flex-center' src={loggedInUser.imgUrl} alt='' />
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
								{modal === 'userModal' && (
									<UserModal loggedInUser={loggedInUser} toggleModal={toggleModal} onLogOut={onLogOut} />
								)}
							</div>
						)}
					</div>
				</header>
			)}
		</>
	);
}
