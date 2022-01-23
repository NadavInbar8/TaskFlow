import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {Cover} from '../detailsModals/modals.jsx';

// images
import blackBoardImg from '../../assets/imgs/black-trello.svg';

export const BoardMenu = ({toggleModal, addCover}) => {
	const {board} = useSelector((state) => ({board: state.boardModule.currBoard}), shallowEqual);
	const [coverModal, setCoverModal] = useState(false);

	return (
		<section className='board-menu'>
			<div className='board-menu-inner'>
				<div className='modal-top'>
					<h3>Menu</h3>
					{/* <img onClick={() => toggleModal('menu')} src={close} alt='' /> */}
					<button onClick={() => toggleModal('menu')}>x</button>
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
						setCoverModal(!coverModal);
					}}>
					<div
						className='board-background-img align-center'
						style={{backgroundColor: board.style.backgroundColor}}></div>
					&nbsp;
					<h5>Change background</h5>
					{coverModal && <Cover addCover={addCover} toggleModal={toggleModal} />}
				</div>
				<div className='activity'>
					<h2 className='acitivity-h2'>Activity</h2>
					<hr className='activity-hr'></hr>
				</div>
			</div>
		</section>
	);
};
