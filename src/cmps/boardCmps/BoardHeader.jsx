// React
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

// Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {loadBoard, addCard, updateBoard} from '../../store/board.action.js';

// Cmps
import {BoardFilter} from '../../cmps/boardCmps/BoardFilter.jsx';
import {BoardMenu} from '../../cmps/boardCmps/BoardMenu.jsx';

// imgs
import addUser from '../../assets/imgs/add-user.png';
import filterSvg from '../../assets/imgs/filter-svgs/filter.svg';

// Funcs
// import {board, addCover, } from '../../pages/Board.jsx'

export const BoardHeader = ({addCover, board, setForceRender, filterBoard, setCover, forceRender}) => {
	const [width, setWidth] = useState('');
	const [boardTitleInput, setBoardTitleInput] = useState('');
	const [filterModal, setFilterModal] = useState(false);
	const [starStatus, setStarStatus] = useState(false);
	const [menuModal, setMenuModal] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		// if (board)
		setBoardTitleInput(board.title);
	}, []);

	useEffect(() => {
		// if (board)
		setBoardTitleInput(board.title);
		// if (board)
		setWidth(board.title.length - 2 + 'ch');
	}, [board]);

	function handleBoardTitleChange({target}) {
		if (!target) return;
		console.log(target);
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
		switch (type) {
			case 'filter':
				setFilterModal(!filterModal);
				setMenuModal(false);
				break;
			case 'menu':
				setMenuModal(!menuModal);
				setFilterModal(false);
				break;
			default:
		}
	};

	const toggleStarring = () => {
		setStarStatus(!starStatus);
	};

	return (
		<header className='board-header'>
			<div className='header-left-container flex-center'>
				<input
					style={{width}}
					onBlur={updateBoardTitle}
					onChange={handleBoardTitleChange}
					name='title'
					value={boardTitleInput}
					type='text-area'
				/>
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
						<div className='member-icon'>OK</div>
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
						toggleModal('filter');
					}}>
					<span className='flex-center'>
						<img src={filterSvg} alt='filter-img' />
						Filter
					</span>
				</div>
				{filterModal && <BoardFilter filterBoard={filterBoard} toggleModal={toggleModal} />}
				<div className='menu board-header-div flex-center'>
					<span
						onClick={() => {
							toggleModal('menu');
						}}>
						...Show menu
					</span>
				</div>
			</div>
			{menuModal && <BoardMenu toggleModal={toggleModal} setCover={setCover} addCover={addCover} />}
		</header>
	);
};
