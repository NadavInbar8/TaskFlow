import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {removeBoard} from '../../store/board.action.js';
// import {Cover} from '../detailsModals/modals.jsx';
import {Colors} from './Colors.jsx';

// images
import blackBoardImg from '../../assets/imgs/black-trello.svg';
import archive from '../../assets/imgs/archive.svg';
// addCover;
export const BoardMenu = ({toggleModal, addColor, menuOpen, setMenuOpen}) => {
	const {board} = useSelector((state) => ({board: state.boardModule.currBoard}), shallowEqual);
	const [colorModal, setColorModal] = useState(false);
	// const {modal} = useSelector((state) => ({modal: state.boardModule.modal}));

	const dispatch = useDispatch();
	const history = useHistory();

	const onRemoveBoard = () => {
		dispatch(removeBoard(board._id));
		history.push('/workspace');
	};

	return (
		<section className={menuOpen ? 'board-menu shown' : 'board-menu'}>
			<div className='board-menu-inner'>
				<div className='modal-top'>
					<span>Menu</span>
					{/* <img onClick={() => toggleModal('menu')} src={close} alt='' /> */}
					<button onClick={() => setMenuOpen(!menuOpen)}>x</button>
				</div>
				<hr></hr>
				<div className='about-board flex flex-row align-center justify-center'>
					<div className='menu-container-svg align-center'>
						<img src={blackBoardImg} alt='board-img' />
					</div>
					&nbsp;
					<h5>About this board</h5>
					<br></br>
					<span>Add a descreption to your board</span>
				</div>
				<div
					className='change-board-background flex flex-row align-center justify-center pointer'
					onClick={() => {
						setColorModal(!colorModal);
					}}>
					<div
						className='board-background-img align-center'
						style={{backgroundColor: board.style.backgroundColor}}></div>
					&nbsp;
					<h5>Change background</h5>
					{/* {coverModal && <Cover addCover={addCover} toggleModal={toggleModal} />} */}
					{colorModal && <Colors addColor={addColor} toggleModal={toggleModal} />}
				</div>
				<div className='menu-board-actions flex flex-row align-center justify-center' onClick={() => onRemoveBoard()}>
					<img src={archive} alt='' />
					&nbsp;
					<h5>Archive</h5>
				</div>
				<div className='activity'>
					<h2 className='acitivity-h2'>Activity</h2>
					<hr className='activity-hr'></hr>
				</div>
			</div>
		</section>
	);
};
