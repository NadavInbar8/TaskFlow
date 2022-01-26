import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {removeBoard, updateBoard} from '../../store/board.action.js';
// import {Cover} from '../detailsModals/modals.jsx';
import {Colors} from './Colors.jsx';

// Dyanmic Cmps
import {DefaultMenu} from '../boardMenuCmps/DefaultMenu.jsx';
import {Archive} from '../boardMenuCmps/Archive.jsx';
import {ChangeBackground} from '../boardMenuCmps/ChangeBackground.jsx';

// images
import backBtn from '../../assets/imgs/back-btn.svg';
import closeBtn from '../../assets/imgs/close.svg';
// import blackBoardImg from '../../assets/imgs/black-trello.svg';
// import archive from '../../assets/imgs/archive.svg';
// import trash from '../../assets/imgs/trash.svg';

// addCover;
export const BoardMenu = ({menuOpen, setMenuOpen}) => {
	const {board} = useSelector((state) => ({board: state.boardModule.currBoard}), shallowEqual);
	// const {modal} = useSelector((state) => ({modal: state.boardModule.modal}));
	const [menuTitle, setMenuTitle] = useState('Menu');
	const [cmpToRender, setCmpToRender] = useState('defaultMenu');

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		setMenuTitle('Menu');
		setCmpToRender('defaultMenu');
	}, []);

	const onRemoveBoard = () => {
		dispatch(removeBoard(board._id));
		history.push('/workspace');
	};

	const onSetMenuTitle = (title) => {
		console.log(title);
		let menuTitle;
		title ? (menuTitle = title) : (menuTitle = 'Menu');
		setMenuTitle(menuTitle);
	};

	const onSetCmpToRender = (cmp) => {
		setCmpToRender(cmp);
	};

	const changeBG = (entityType, entity) => {
		const updatedBoard = {...board};
		if (entityType === 'color') {
			updatedBoard.style.backgroundColor = entity;
			updatedBoard.style.userClicked = true;
		} else if (entityType === 'img') {
			updatedBoard.style.imgUrl = entity.full;
			updatedBoard.style.previewImgUrl = entity.preview;
			updatedBoard.style.userClicked = false;
		}
		dispatch(updateBoard(updatedBoard));
	};

	return (
		<section className={menuOpen ? 'board-menu shown' : 'board-menu'}>
			<div className='board-menu-inner'>
				<div className='modal-top'>
					{menuTitle !== 'Menu' && (
						<img
							className='back-btn-img pointer'
							src={backBtn}
							alt='back-img'
							onClick={() => {
								onSetMenuTitle('Menu');
								onSetCmpToRender('defaultMenu');
							}}
						/>
					)}
					<span>{menuTitle}</span>
					{/* <img onClick={() => toggleModal('menu')} src={close} alt='' /> */}
					<img src={closeBtn} className='close-btn pointer' alt='close' onClick={() => setMenuOpen(!menuOpen)}></img>
				</div>
				<hr />
				{cmpToRender === 'defaultMenu' && (
					<DefaultMenu
						onSetCmpToRender={onSetCmpToRender}
						onSetMenuTitle={onSetMenuTitle}
						onRemoveBoard={onRemoveBoard}
						board={board}
					/>
				)}
				{cmpToRender === 'Archive' && <Archive />}
				{cmpToRender === 'changeBackground' && <ChangeBackground board={board} changeBG={changeBG} />}
				{/* <div className='about-board flex flex-row align-center justify-center'>
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
						onSetMenuTitle('Change background');
						onSetCmpToRender('changeBGC');
					}}>
					<div
						className='board-background-img align-center'
						style={{backgroundColor: board.style.backgroundColor}}></div>
					&nbsp;
					<h5>Change background</h5>
				</div>
				<div className='menu-board-actions flex flex-row align-center justify-center' onClick={() => onOpenArchive()}>
					<img src={archive} alt='' />
					&nbsp;
					<h5>Archive</h5>
				</div>
				<div className='menu-board-actions flex flex-row align-center justify-center' onClick={() => onRemoveBoard()}>
					<img src={trash} alt='' />
					&nbsp;
					<h5>Remove board</h5>
				</div>
				<div className='activity'>
					<h2 className='acitivity-h2'>Activity</h2>
					<hr className='activity-hr'></hr>
				</div> */}
			</div>
		</section>
	);
};
