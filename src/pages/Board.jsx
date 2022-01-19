import React, {useEffect, useState} from 'react';
import {CardDetails} from './CardDetails.jsx';
import {Route, Switch} from 'react-router';
import {Link, useParams} from 'react-router-dom';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {loadBoard} from '../store/board.action.js';

export const Board = () => {
	const {boardId} = useParams();
	const {board} = useSelector((state) => ({board: state.boardModule.currBoard}), shallowEqual);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(boardId);
		dispatch(loadBoard(boardId));
	}, []);

	return (
		<section>
			{board ? (
				<div>
					<h1>{board.title}</h1>
					<div className='board flex'>
						{board.groups
							? board.groups.map((list) => {
									return (
										<div key={list.id} className='board-list flex-column'>
											<h3>{list.title}</h3>
											<ul>
												{list.tasks.map((card) => {
													return (
														<li key={card.id} className='board-card'>
															<Link to={`/board/${boardId}/${card.id}/${list.id}`}>{card.title}</Link>
														</li>
													);
												})}
											</ul>
										</div>
									);
							  })
							: null}
					</div>
					<Switch>
						<Route component={() => <CardDetails board={board} />} path={`/board/:boardId/:cardId/:listId`} />
					</Switch>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</section>
	);
};

// function mapStateToProps({ boardModule }) {
//   return {
//     boards: boardModule.boards,
//   };
// }
// const mapDispatchToProps = {
//   // loadBoards,
// };

// export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board);

// function mapStateToProps({ toyModule, userModule }) {
// 	return {
// 	  toys: toyModule.toys,
// 	  filterBy: toyModule.filterBy,
// 	  user: userModule.loggedInUser,
// 	  isModalShown: toyModule.isModalShown,
// 	};
//   }

//   const mapDispatchToProps = {
// 	setToys,
// 	removeToy,
// 	setFilterBy,
//   };

//   export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp);
