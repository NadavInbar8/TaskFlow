import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {loadBoards, addBoard, openModal, updateBoard} from '../../store/board.action.js';
import {setUser} from '../../store/user.action.js';
import {Link, useLocation, useHistory} from 'react-router-dom';

import closeBtn from '../../assets/imgs/close.svg';
import check from '../../assets/imgs/check.svg';

export const InviteModal = ({users, loggedInUser, board}) => {
	const dispatch = useDispatch();
	const toggleModal = (type) => {
		dispatch(openModal(type));
	};

	const toggleUserInBoard = async (user) => {
		console.log(user);
		const userId = user._id;
		const updatedBoard = {...board};
		const updatedBoardMembers = updatedBoard.members;
		const memberIdx = updatedBoardMembers.findIndex((member) => userId === member._id);
		memberIdx !== -1 ? updatedBoardMembers.splice(memberIdx, 1) : updatedBoardMembers.push(user);
		updatedBoard.members = updatedBoardMembers;
		console.log(updatedBoard);
		await dispatch(updateBoard(updatedBoard));
		checkUserInBoard(user._id);
	};

	const checkUserInBoard = (userId) => {
		const imgToRender = board.members.some((member) => member._id === userId);
		console.log(imgToRender);
		if (imgToRender) return <img src={check} alt='check' />;
		else return '';
	};

	return (
		<section className='invite-modal'>
			<div className='modal-top'>
				<span className='modal-top-span'>Invite to board</span>
				<img src={closeBtn} className='close-btn pointer' alt='close' onClick={() => toggleModal()}></img>
			</div>
			<div className='users-div'>
				<ul className='users-list'>
					{users.map((user) => {
						return (
							<li
								key={user._id}
								onClick={() => {
									toggleUserInBoard(user);
								}}>
								<div className='user-profile-div'>
									{user?.imgUrl ? (
										<div className='user-details'>
											<div className='flex align-center'>
												<img className='user-avatar-btn flex-center' src={user.imgUrl} alt='' />
												<span>{user.fullName}</span>
											</div>
											<span>{checkUserInBoard(user._id)}</span>
										</div>
									) : (
										<div className='user-details'>
											<div className='flex align-center'>
												<div className='user-avatar-btn flex-center'>{user ? user.initials : 'G'}</div>
												<span>{user.fullName}</span>
											</div>
											<span>{checkUserInBoard(user._id)}</span>
										</div>
									)}
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
};
