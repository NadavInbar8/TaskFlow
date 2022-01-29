export const Members = ({board, loggedInUser}) => {
	return (
		<div className='member-icons'>
			<div className='member-icon'>
				{/* onClick=
						{() => {
							toggleMemberInBoard(member);
						}} */}

				{loggedInUser?.imgUrl ? (
					<img className='member-avatar-btn flex-center' src={loggedInUser.imgUrl} alt='' />
				) : (
					<div className='flex align-center'>
						<div className='member-avatar-btn flex-center'>{loggedInUser ? loggedInUser.initials : 'G'}</div>
					</div>
				)}
			</div>
			{board?.members.map((member) => {
				if (member._id !== loggedInUser._id)
					return (
						<div className='member-icon'>
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
			})}
		</div>
	);
};
