import activity from '../../assets/imgs/menuActivity.svg';

<<<<<<< HEAD
export const Activity = ({board}) => {
	const activitiesToRender = board?.activities?.reverse();
	return (
		<section className='menu-board-actions flex flex-row pointer activity-div'>
			<div className='activity-header'>
				<img src={activity} className='activity-img' alt='' />
				<span className='acitivity-h2'>Activity</span>
			</div>
			<div className='activity-list-container'>
				<ul className='activity-list'>
					{activitiesToRender?.map((activity, idx) => {
						return (
							<li key={idx}>
								<div className='activity-img'>
									<div className='user-profile-div'>
										{activity.user?.imgUrl ? (
											<div className='user-details'>
												<div className='flex align-center'>
													<img className='user-avatar-btn flex-center' src={activity.user.imgUrl} alt='' />
												</div>
											</div>
										) : (
											<div className='user-details'>
												<div className='flex align-center'>
													<div className='user-avatar-btn flex-center'>
														{activity.user ? activity.user.initials : 'G'}
													</div>
												</div>
											</div>
										)}
									</div>
								</div>
								<div className='activity-text'>
									<span className='acitivity-maker bold'>{activity.user.fullName}</span>
									<p className='activity-msg '>{activity.msg}</p>
									<span className='activity-time'> at {activity.time}</span>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
=======
export const Activity = ({ board }) => {
  const activitiesToRender = board?.activities?.reverse();
  return (
    <section className='menu-board-actions flex flex-row pointer activity-div'>
      <div className='activity-header'>
        <img src={activity} className='activity-img' alt='' />
        <span className='acitivity-h2'>Activity</span>
      </div>
      <div className='activity-list-container'>
        <ul className='activity-list'>
          {activitiesToRender?.map((activity) => {
            return <li>{activity.msg}</li>;
          })}
        </ul>
      </div>
    </section>
  );
>>>>>>> 2ca5f1687357aa7c5b82c2b7b3d84b72dce09b5f
};
