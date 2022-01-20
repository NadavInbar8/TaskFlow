import React, {useEffect, useState} from 'react';
import {CardDetails} from './CardDetails.jsx';
import {Route, Switch} from 'react-router';
import {Link, useParams} from 'react-router-dom';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {loadBoard, updateBoard} from '../store/board.action.js';
import {BoardFilter} from '../cmps/Boardfilter.jsx';

export const Board = () => {
	const {boardId} = useParams();
	let {board} = useSelector((state) => ({board: state.boardModule.currBoard}), shallowEqual);
	const dispatch = useDispatch();
	const [filteredBoard, setBoard] = useState({});

	useEffect(() => {
		console.log(boardId);
		dispatch(loadBoard(boardId));
	}, []);

	useEffect(() => {
		console.log('nadav');
	}, [filteredBoard]);

	function setFilteredBoard(ev, filter = null) {
		ev.preventDefault();
		// console.log('ev', ev);
		console.log('filter', filter);
		console.log('board', board);
		let {name} = filter;
		name = name.toLowerCase();
		console.log(name);
		const newFilteredBoard = board;
		const filteredGroups = newFilteredBoard.groups.filter((group) => group.title.toLowerCase().includes(name));
		// const filteredTasks = filteredBoard.groups.forEach((group) =>
		// 	group.tasks.filter((task) => task.title.toLowerCase().includes(name.toLowerCase()))
		// );
		// filteredBoard.groups = filteredGroups.forEach(group);
		newFilteredBoard.groups = filteredGroups;
		setBoard(newFilteredBoard);
		board = filteredBoard;
		console.log(board);
	}

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
					<BoardFilter setFilteredBoard={setFilteredBoard} />
					<Route component={CardDetails} path={`/board/:boardId/:cardId/:listId`} />
				</div>
			) : (
				<div>Loading...</div>
			)}
		</section>
	);
};
