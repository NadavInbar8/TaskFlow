import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';

// images
import blackBoardImg from '../../assets/imgs/black-board.svg';

export const BoardMenu = ({toggleModal}) => {
	return (
		<section className='board-menu'>
			<div className='modal-top'>
				<h3>Menu</h3>
				{/* <img onClick={() => toggleModal('menu')} src={close} alt='' /> */}
				<button onClick={() => toggleModal('menu')}>x</button>
			</div>
			<hr></hr>
			<div className='about-board flex flex-row align-center justify-center'>
				<div className='menu-container-svg center'>
					<img src={blackBoardImg} alt='board-img' />
				</div>
				<h5>About this board</h5>
				<br></br>
				<span>Add a descreption to your board</span>
			</div>
			<div className='change-board-background flex flex-row align-center justify-center'>
				<div className='board-background-img align-center'></div>
				<h5>Change background</h5>
			</div>
			<div classNmae='activity'>
				<h2>Activity</h2>
				<hr className='activity-hr'></hr>
			</div>
		</section>
	);
};
