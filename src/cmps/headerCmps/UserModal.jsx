import React from 'react';
import {Link} from 'react-router-dom';
import closeBtn from '../../assets/imgs/close.svg';

export const UserModal = ({loggedInUser, toggleModal, onLogOut}) => {
	return (
		<div className='user-modal'>
			<div>
				<div className='modal-top'>
					<span className='modal-top-span'>Account</span>
					<img src={closeBtn} className='close-btn pointer' alt='close' onClick={() => toggleModal()}></img>
				</div>
				{loggedInUser ? (
					<div>
						<div className='user-details flex'>
							<div className='user-avatar-btn flex-center m-y-m'>
								{loggedInUser.imgUrl ? (
									<img className='roundImg' src={loggedInUser.imgUrl} alt='' />
								) : (
									<h4>{loggedInUser.initials}</h4>
								)}
							</div>
							<div className='user-details-text'>
								<p className='user-fullname'>{loggedInUser.fullName}</p>
								<p className='user-mail-or-username'>
									{loggedInUser.email ? loggedInUser.email : loggedInUser.username}
								</p>
							</div>
						</div>
						<span
							className='logout pointer'
							onClick={() => {
								onLogOut();
							}}>
							Logout
						</span>
					</div>
				) : (
					<div className='flex flex-start '>
						<div className='user-avatar flex-column'>
							<div className='user-avatar-btn flex-center m-y-m'>
								<h2>G</h2>
							</div>
							<Link to='/login'>
								<span className='logout pointer'>Login</span>
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
