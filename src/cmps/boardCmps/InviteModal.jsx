import React from 'react';
import {useDispatch} from 'react-redux';
import {openModal, updateBoard} from '../../store/board.action.js';

import closeBtn from '../../assets/imgs/close.svg';
import check from '../../assets/imgs/check.svg';

// Services
import {utilService} from '../../services/util.service.js';

export const InviteModal = ({users, loggedInUser, board}) => {
	const dispatch = useDispatch();
	const toggleModal = (type, ev) => {
		ev.stopPropagation();
		dispatch(openModal(type));
	};

	const toggleUserInBoard = async (user) => {
		const userId = user._id;
		const updatedBoard = {...board};
		const updatedBoardMembers = updatedBoard.members;
		const memberIdx = updatedBoardMembers.findIndex((member) => userId === member._id);
		memberIdx !== -1 ? updatedBoardMembers.splice(memberIdx, 1) : updatedBoardMembers.push(user);
		updatedBoard.members = updatedBoardMembers;
		let activity = {
			user: loggedInUser,
			msg: `Invited user ${user.fullName} to join this board`,
			time: utilService.getNiceDate(),
		};
		updatedBoard.activities.unshift(activity);
		await dispatch(updateBoard(updatedBoard));
		checkUserInBoard(user._id);
	};

	const checkUserInBoard = (userId) => {
		const imgToRender = board.members.some((member) => member._id === userId);
		if (imgToRender) return <img src={check} alt='check' />;
		else return '';
	};

	return (
		<section className='invite-modal'>
			<div className='modal-top'>
				<span className='modal-top-span'>Invite to board</span>
				<img src={closeBtn} className='close-btn pointer' alt='close' onClick={(ev) => toggleModal('', ev)}></img>
			</div>
			<div className='users-div'>
				<ul className='users-list'>
					{users &&
						loggedInUser &&
						users.map((user) => {
							if (user?._id !== loggedInUser?._id) {
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
							}
						})}
				</ul>
			</div>
		</section>
	);
};
