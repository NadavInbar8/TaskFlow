export const Members = ({board, loggedInUser, toggleModal}) => {
	return (
		<div className='member-icons'>
			<div className='member-icon'>
				{loggedInUser?.imgUrl ? (
					<img
						className='member-avatar-btn flex-center'
						title={loggedInUser.fullName}
						src={loggedInUser?.imgUrl}
						alt=''
					/>
				) : (
					<div className='flex align-center'>
						<div className='member-avatar-btn flex-center'>{loggedInUser ? loggedInUser.initials : 'G'}</div>
					</div>
				)}
			</div>
			{board?.members &&
				board?.members?.map((member, idx) => {
					if (member?._id !== loggedInUser?._id && idx <= 4)
						return (
							<div className='member-icon' title={member.fullName} key={member._id}>
								{member?.imgUrl ? (
									<img className='member-avatar-btn flex-center' title={member.fullName} src={member.imgUrl} alt='' />
								) : (
									<div className='flex align-center'>
										<div className='member-avatar-btn flex-center'>{member ? member.initials : 'G'}</div>
									</div>
								)}
							</div>
						);
				})}
		</div>
	);
};
