import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {openModal, addBoard} from '../../store/board.action.js';

export const CreateModal = () => {
	const dispatch = useDispatch();

	const [newBoard, setNewBoard] = useState({});
	const [boardTitleInput, setBoardTitleInput] = useState('');
	const {loggedInUser} = useSelector((state) => ({
		loggedInUser: state.userModule.loggedInUser,
	}));

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

	const getBorderColor = () => {
		if (boardTitleInput.length === 0) return 'red';
		return 'grey';
	};

	const updateBoardTitle = () => {
		setNewBoard({...newBoard, title: boardTitleInput, createdBy: loggedInUser});
		console.log(newBoard);
	};

	function handleBoardTitleChange({target}) {
		if (!target) return;
		// console.log(target);
		const value = target.value;
		setBoardTitleInput(value);
	}

	const toggleModal = (type) => {
		dispatch(openModal(type));
	};

	const saveNewBoard = () => {
		dispatch(addBoard(newBoard));
	};

	return (
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
				)}
			</div>
		</div>
	);
};
