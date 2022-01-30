import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {MemberModal} from './MemberModal.jsx';

export const Members = ({board, loggedInUser, toggleModal}) => {
	const {modal} = useSelector((state) => ({
		modal: state.boardModule.modal,
	}));
	return (
		<div className='member-icons'>
			<div className='member-icon'>
				{/* onClick=
						{() => {
							toggleMemberInBoard(member);
						}} */}

				{loggedInUser?.imgUrl ? (
					<img className='member-avatar-btn flex-center' src={loggedInUser?.imgUrl} alt='' />
				) : (
					<div className='flex align-center'>
						<div className='member-avatar-btn flex-center'>{loggedInUser ? loggedInUser.initials : 'G'}</div>
					</div>
				)}
				{/* <MemberModal member={loggedInUser} toggleModal={toggleModal} /> */}
			</div>
			{board?.members?.map((member) => {
				if (member._id !== loggedInUser._id)
					return (
						<div className='member-icon' key={member._id}>
							{/* onClick=
						{() => {
							toggleMemberInBoard(member);
						}} */}

							{member?.imgUrl ? (
								<img className='member-avatar-btn flex-center' src={member.imgUrl} alt='' />
							) : (
								<div className='flex align-center'>
									<div className='member-avatar-btn flex-center'>{member ? member.initials : 'G'}</div>
								</div>
							)}
						</div>
					);
				// <MemberModal member={member} toggleModal={toggleModal} />;
			})}
		</div>
	);
};
