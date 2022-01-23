import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {loadBoards} from '../store/board.action.js';

import boardPreview from '../assets/imgs/boardPreview.jpg';
import {Link} from 'react-router-dom';
import usersvg from '../assets/imgs/usersvg.svg';

export const WorkSpace = () => {
	const {boards} = useSelector((state) => ({boards: state.boardModule.boards}), shallowEqual);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadBoards());
	}, []);

	return (
		<div className='work-space'>
			<div className='nav'>
				<ul>
					<li>Boards</li>
					<li>Templates</li>
					<li>Home</li>
					<li>work-space</li>
				</ul>

				<ul>
					<li>Boards</li>
					<li>hightlights</li>
					<li>WorkSpace table</li>
					<li>Members</li>
					<li>Settings</li>
				</ul>
			</div>

			<div className='workspaces-boards'>
				<div className='boards'>
					<div className='headline'>
						<img className='usersvg' src={usersvg} alt='' />
						<h1 className='headline'> Workspaces boards</h1>
					</div>
					<div className='boards-container'>
						{boards.length ? (
							boards.map((board) => {
								return (
									<div key={board._id} className='board-preview'>
										<Link to={`/board/${board._id}`}>
											<h3 className='workspace-board-title'>{board.title}</h3>
											<img src={boardPreview} alt='' />
											{/* <img src='https://source.unsplash.com/random/1920x1080/?wallpaper,landscape' alt='' /> */}
										</Link>
									</div>
								);
							})
						) : (
							<div>Loading...</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

// function mapStateToProps({ boardModule }) {
//   return {
//     boards: boardModule.boards,
//   };
// }

// const mapDispatchToProps = {
//   loadBoards,
// };

// export const WorkSpace = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_WorkSpace);
