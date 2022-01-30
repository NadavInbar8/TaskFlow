import activity from '../../assets/imgs/menuActivity.svg';

export const Activity = ({board}) => {
	let copyBoard = {...board};
	let activitiesToRender = copyBoard.activities;
	// console.log('right order', board.activities);
	return (
		<section className='menu-board-actions flex flex-row pointer activity-div'>
			<div className='activity-header'>
				<img src={activity} className='activity-img' alt='' />
				<span className='acitivity-h2'>Activity</span>
			</div>
			<div className='activity-list-container'>
				<ul className='activity-list'>
					{activitiesToRender?.map((activity, idx) => {
						// console.log(activity);
						return (
							<li key={idx}>
								<div className='activity-div'>
									<div className='user-profile-div'>
										{activity.user?.imgUrl ? (
											<div className='flex align-center float-left activity-img-div'>
												<img className='user-avatar-btn flex-center float-left' src={activity.user.imgUrl} alt='' />
											</div>
										) : (
											<div className='user-details'>
												<div className='user-avatar-btn flex-center'>
													{activity.user ? activity.user.initials : 'G'}
												</div>
											</div>
										)}
									</div>
									<div className='activity-text'>
										<span className='acitivity-maker bold'>{activity?.user?.fullName}</span>
										<p className='activity-msg '>{activity.msg}</p>
										<span className='activity-time'> at {activity.time}</span>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
};
