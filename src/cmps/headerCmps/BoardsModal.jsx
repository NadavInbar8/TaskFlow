import React from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {openModal, updateBoard} from '../../store/board.action.js';

import closeBtn from '../../assets/imgs/close.svg';
import star from '../../assets/imgs/star.svg';
import fullStar from '../../assets/imgs/starFill.svg';

export const BoardsModal = () => {
	const {boards} = useSelector((state) => ({boards: state.boardModule.boards}), shallowEqual);

	const history = useHistory();
	const dispatch = useDispatch();

	const boardsToDisplay = [...boards].slice(0, 10);

	const toggleModal = (type) => {
		dispatch(openModal(type));
	};

	const getBackground = (board) => {
		return board.style.userClicked ? board.style.backgroundColor : `url(${board.style.previewImgUrl})`;
	};

	function starBoard(ev, board) {
		ev.stopPropagation();
		let newBoard = board;
		if (newBoard.starred === true) {
			newBoard.starred = false;
		} else {
			newBoard.starred = true;
		}

		dispatch(updateBoard(newBoard));
	}

	return (
		<ul className='boards-modal flex'>
			<div className='modal-top'>
				<span className='modal-top-span'>Boards</span>
				<img src={closeBtn} className='close-btn pointer' alt='close' onClick={() => toggleModal()}></img>
			</div>
			{boardsToDisplay.map((board) => {
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
							}>
							<span className='board-title-span'>
								{board.title.length > 15 ? `${board.title.slice(0, 15)}...` : board.title}
							</span>
						</div>
						<div className='star-svg'>
							{board.starred === false && (
								<img
									onClick={(ev) => {
										starBoard(ev, board);
									}}
									className='star-svg-img'
									src={star}
									alt=''
								/>
							)}

							{board.starred === true && (
								<img
									onClick={(ev) => {
										starBoard(ev, board);
									}}
									className='star-svg-img'
									src={fullStar}
									alt=''
								/>
							)}
						</div>
					</li>
				);
			})}
		</ul>
	);
};
