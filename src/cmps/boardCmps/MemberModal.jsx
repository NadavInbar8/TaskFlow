import closeBtn from '../../assets/imgs/close.svg';

export const MemberModal = ({toggleModal, member}) => {
	return (
		<div className='member-modal'>
			<div className='modal-top'>
				<span>Account</span>
				<img src={closeBtn} className='close-btn pointer' alt='close' onClick={() => toggleModal()}></img>
			</div>
			<div>
				<div className='user-details flex'>
					<div className='user-avatar-btn flex-center m-y-m'>
						{member.imgUrl ? <img className='roundImg' src={member.imgUrl} alt='' /> : <h4>{member.initials}</h4>}
					</div>
					<div className='user-details-text'>
						<p className='user-fullname'>{member.fullName}</p>
						<p className='user-mail-or-username'>{member.email ? member.email : member.username}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
