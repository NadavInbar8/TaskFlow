import activity from '../../assets/imgs/menuActivity.svg';

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
};
