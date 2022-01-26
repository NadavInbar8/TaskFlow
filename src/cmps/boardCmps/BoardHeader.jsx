// React
import React, {useEffect, useState} from 'react';
// import {Link, useParams} from 'react-router-dom';

// Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {updateBoard, openModal} from '../../store/board.action.js';

// Cmps
import {BoardFilter} from '../../cmps/boardCmps/BoardFilter.jsx';
import {BoardMenu} from '../../cmps/boardCmps/BoardMenu.jsx';

// imgs
import addUser from '../../assets/imgs/add-user.png';
import filterSvg from '../../assets/imgs/filter-svgs/filter.svg';

// Funcs

export const BoardHeader = ({setForceRender, filterBoard, forceRender}) => {
	const {board} = useSelector((state) => ({board: state.boardModule.currBoard}), shallowEqual);
	const {modal} = useSelector((state) => ({
		modal: state.boardModule.modal,
	}));
	const [width, setWidth] = useState('');
	const [boardTitleInput, setBoardTitleInput] = useState('');
	const [starStatus, setStarStatus] = useState(false);
	const {loggedInUser} = useSelector((state) => ({
		loggedInUser: state.userModule.loggedInUser,
	}));
	const [menuOpen, setMenuOpen] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		// if (board)
		setBoardTitleInput(board.title);
	}, []);

	useEffect(() => {
		// if (board)
		setBoardTitleInput(board.title);
		// if (board)
		setWidth(board.title.length + 'ch');
	}, [board]);

	function handleBoardTitleChange({target}) {
		console.log(target);
		if (!target || target.value.length === 0 || target == ' ') return;
		// const field = target.name;
		const value = target.value;
		setWidth(value.length + 'ch');
		setBoardTitleInput(value);
	}

	const updateBoardTitle = () => {
		const updatedBoard = {...board};
		updatedBoard.title = boardTitleInput;
		dispatch(updateBoard(updatedBoard));
		setForceRender(!forceRender);
	};

	const toggleModal = (type) => {
		dispatch(openModal(type));
		// switch (type) {
		// 	case 'filter':
		// 		setFilterModal(!filterModal);
		// 		setMenuModal(false);
		// 		break;
		// 	case 'menu':
		// 		setMenuModal(!menuModal);
		// 		setFilterModal(false);
		// 		break;
		// 	default:
		// }
	};

	const toggleStarring = () => {
		setStarStatus(!starStatus);
	};

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

	const addColor = (color) => {
		const actualColor = getColors(color);
		const updatedBoard = {...board};
		updatedBoard.style.backgroundColor = actualColor;
		dispatch(updateBoard(updatedBoard));
	};

	//   const getUserInitials = () => {
	//     if (loggedInUser) {
	//       let fullName = loggedInUser.fullName;
	//       console.log(fullName);
	//       fullName = fullName.split(' ');
	//       const initials =
	//         fullName[0].charAt(0).toUpperCase() +
	//         fullName[1].charAt(0).toUpperCase();
	//       return initials;
	//     }
	//   };

	const openMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<header className='board-header'>
			<div className='header-left-container flex-center'>
				{/* <div className='board-header-div'> */}
				<input
					className='board-title'
					style={{width}}
					onBlur={updateBoardTitle}
					onChange={handleBoardTitleChange}
					name='title'
					value={boardTitleInput}
					type='text-area'
				/>
				{/* </div> */}
				<div className='board-header-div star-container flex-center'>
					<span
						onClick={() => {
							toggleStarring();
						}}
						className={starStatus ? 'starOn' : 'star'}>
						&#9734;
					</span>
				</div>
				<div className='users-div flex-center'>
					<div className='member-icons'>
						<div className='member-icon'>{loggedInUser ? loggedInUser.initials : 'OK'}</div>
						<div className='member-icon'>NI</div>
						<div className='member-icon'>TR</div>
					</div>
					<div className='board-header-div invite-btn flex-center'>
						<img className='add-user-img' src={addUser} alt='' />
						<span>Invite</span>
					</div>
				</div>
			</div>
			<div className='actions-div flex'>
				<div className='board-header-div dashboard flex-center'>
					<span>Dashboard</span>
				</div>
				<div
					className='board-header-div filter-div flex-center'
					onClick={() => {
						toggleModal('filterModal');
					}}>
					<span className='flex-center'>
						<img src={filterSvg} alt='filter-img' />
						Filter
					</span>
				</div>
				{modal === 'filterModal' && <BoardFilter filterBoard={filterBoard} toggleModal={toggleModal} />}
				<div className='menu-div board-header-div flex-center'>
					<span
						onClick={() => {
							openMenu();
						}}>
						...Show menu
					</span>
				</div>
				<BoardMenu toggleModal={toggleModal} addColor={addColor} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
			</div>
		</header>
	);
};
