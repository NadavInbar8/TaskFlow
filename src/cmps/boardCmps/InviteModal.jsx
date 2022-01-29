import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {loadBoards, addBoard, openModal, updateBoard} from '../../store/board.action.js';
import {setUser} from '../../store/user.action.js';
import {Link, useLocation, useHistory} from 'react-router-dom';

import closeBtn from '../../assets/imgs/close.svg';

export const InviteModal = ({users, loggedInUser, board}) => {
	const dispatch = useDispatch();
	const toggleModal = (type) => {
		dispatch(openModal(type));
	};

	return (
		<section className='invite-modal'>
			<div className='modal-top'>
				<span className='modal-top-span'>Invite</span>
				<img src={closeBtn} className='close-btn pointer' alt='close' onClick={() => toggleModal()}></img>
			</div>
			<div className='users-div'>
				<ul className='users-list'>
					{users.map((user) => {
						console.log(user);
						return (
							<li key={user._id}>
								<div className='user-profile-div'>
									{user?.imgUrl ? (
										<div className='user-avatar'>
											<img className='user-avatar-btn flex-center' src={user.imgUrl} alt='' />
										</div>
									) : (
										<div className='user-avatar'>
											<div className='user-avatar-btn flex-center'>{user ? user.initials : 'G'}</div>
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
