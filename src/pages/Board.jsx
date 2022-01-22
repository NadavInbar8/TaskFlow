import React, {useEffect, useState} from 'react';
import {CardDetails} from './CardDetails.jsx';
import {Route, Switch} from 'react-router';
import {Link, useParams} from 'react-router-dom';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {loadBoard, addCard, updateBoard} from '../store/board.action.js';
import {BoardFilter} from '../cmps/Boardfilter.jsx';
import {utilService} from '../services/util.service.js';
import addUser from '../assets/imgs/add-user.png';

export const Board = () => {
	const {boardId} = useParams();
	const {board} = useSelector((state) => ({board: state.boardModule.currBoard}), shallowEqual);
	const [filteredBoard, setFilteredBoard] = useState({});
	const dispatch = useDispatch();

	////// modal stuff /////
	const [editModal, setEditModal] = useState(false);
	const [memberModal, setMemeberModal] = useState(false);
	const [labelsModal, setLabelsModal] = useState(false);
	const [datesModal, setDatesModal] = useState(false);
	const [filterModal, setFilterModal] = useState(false);
	const [starStatus, setStarStatus] = useState(false);

	useEffect(() => {
		console.log('nadav');
	}, [filteredBoard]);

	const [selectedCard, setSelectedCard] = useState({});
	const [newList, setNewList] = useState(false);
	const [listName, setListName] = useState('');
	const [newCard, setNewCard] = useState({});
	const [edit, setEdit] = useState(false);
	const [boardTitleInput, setBoardTitleInput] = useState('');

	const [forceRender, setForceRender] = useState(true);

	useEffect(() => {
		dispatch(loadBoard(boardId));
	}, []);

	useEffect(() => {
		dispatch(loadBoard(boardId));
		// setBoardTitleInput(board.title);
	}, [forceRender]);

	useEffect(() => {
		if (board) setBoardTitleInput(board.title);
		console.log('board has updated');
	}, [board]);

	function handleChange({target}) {
		// const field = target.name;
		const value = target.value;
		setNewCard({...newCard, title: value});
	}

	function FilterBoard(ev, filter = null) {
		ev.preventDefault();
		// console.log('ev', ev);
		console.log('filter', filter);
		console.log('board', board);
		let {name} = filter;
		if (filter.name === '') {
			setForceRender(!forceRender);
		} else {
			name = name.toLowerCase();
			console.log(name);
			const newFilteredBoard = board;
			let filteredGroups = newFilteredBoard.groups.filter((group) => group.title.toLowerCase().includes(name));
			const filteredTasks = filteredBoard.groups.forEach((group) =>
				group.tasks.filter((task) => task.title.toLowerCase().includes(name.toLowerCase()))
			);
			console.log(filteredTasks);
			// filteredBoard.groups = filteredGroups.forEach(group);
			newFilteredBoard.groups = filteredGroups;
			setFilteredBoard(newFilteredBoard);
		}
	}

	function handleBoardTitleChange({target}) {
		if (!target) return;
		console.log(target);
		// const field = target.name;
		const value = target.value;
		setBoardTitleInput(value);
	}

	const updateBoardTitle = () => {
		const updatedBoard = {...board};
		updatedBoard.title = boardTitleInput;
		dispatch(updateBoard(updatedBoard));
		setForceRender(!forceRender);
	};

	const editNewCard = (list) => {
		setNewCard({...newCard, id: utilService.makeId()});
		list.editMode = true;
		setEdit(true);
	};

	const editCard = (list, card) => {
		const editedCard = {...card, title: newCard.title};
		setSelectedCard(editedCard);
		let listIdx = board.groups.findIndex((group) => group.id === list.id);
		let cardIdx = list.tasks.findIndex((task) => task.id === card.id);
		const updatedBoard = {...board};
		updatedBoard.groups[listIdx].tasks[cardIdx] = editedCard;
		dispatch(updateBoard(updatedBoard));
		closeEditModal(card);
	};

	// const editCard = (card) => {
	//   card.editMode = true;
	// };

	const addNewCard = (list) => {
		let listIdx = board.groups.findIndex((group) => group.id === list.id);
		list.tasks.push(newCard);
		const updatedBoard = {...board};
		updatedBoard.groups[listIdx] = list;
		updatedBoard.groups[listIdx].editMode = false;
		setEdit(false);
		dispatch(updateBoard(updatedBoard));
	};

	const openEditModal = (card) => {
		// card.editMode = true;
		setSelectedCard(card);
		// setEditModal(true);
		// console.log(card);
	};
	const closeEditModal = (card) => {
		// change to toggle or save later
		// console.log('selected card', selecetCard);
		setSelectedCard({});
		setEditModal(false);
		// card.editMode = false;
	};

	const handleNewList = ({target}) => {
		const value = target.value;
		setListName(value);
	};
	const addNewGroup = () => {
		const updatedBoard = {...board};
		const newGroup = {
			id: utilService.makeId(),
			style: {},
			tasks: [],
			title: listName,
		};
		updatedBoard.groups.push(newGroup);
		dispatch(updateBoard(updatedBoard));
		setNewList(false);
	};

	const deleteList = (list) => {
		console.log(list);
		const updatedBoard = {...board};
		updatedBoard.groups = updatedBoard.groups.filter((group) => group.id !== list.id);
		dispatch(updateBoard(updatedBoard));
		setForceRender(!forceRender);
	};

	const toggleModal = (type) => {
		type === 'filter' && setFilterModal(!filterModal);
	};

	const toggleStarring = () => {
		setStarStatus(!starStatus);
	};

	return (
		<section>
			{board ? (
				<div>
					<header className='board-header'>
						<div className='header-left-container flex-center'>
							<input
								className='board-title flex-center'
								onBlur={updateBoardTitle}
								onChange={handleBoardTitleChange}
								name='title'
								value={boardTitleInput}
								type='text-area'
							/>
							<div className='board-header-div star-container flex-center'>
								<span
									onClick={() => {
										toggleStarring();
									}}
									className={starStatus ? 'starOn' : 'star'}>
									&#9734;
								</span>
							</div>
						</div>
						<div className='users-div flex-center'>
							<div className='member-icons'>
								<div className='member-icon'>OK</div>
								<div className='member-icon'>NI</div>
								<div className='member-icon'>TR</div>
							</div>
							<div className='board-header-div invite-btn flex-center'>
								<img className='add-user-img' src={addUser} alt='' />
								<span>Invite</span>
							</div>
						</div>
						<div className='actions-div flex'>
							<div className='board-header-div dashboard flex-center'>
								<span>Dashboard</span>
							</div>
							<div className='board-header-div filter-div flex-center'>
								<span
									onClick={() => {
										toggleModal('filter');
									}}>
									Filter
								</span>
							</div>
							<div className='menu board-header-div flex-center'>
								<span>...Show menu</span>
							</div>
						</div>
					</header>
					<div className='board flex'>
						{board.groups
							? board.groups.map((list) => {
									return (
										<div key={list.id} className='board-list flex-column'>
											<h3>{list.title}</h3>
											<button className='grey-btn' onClick={() => deleteList(list)}>
												delete list
											</button>
											<ul>
												{list.tasks.map((card) => {
													return selectedCard.id !== card.id ? (
														<li key={card.id} className='board-card'>
															<Link to={`/board/${boardId}/${card.id}/${list.id}`}>{card.title}</Link>{' '}
															<button className='grey-btn' onClick={() => openEditModal(card)}>
																edit
															</button>
														</li>
													) : (
														<li key={card.id} className='board-card'>
															<input type='text' defaultValue={card.title} onChange={handleChange} />
															<div className='add-card' onClick={() => editCard(list, card)}>
																save
															</div>
															<div className='edit-modal'>
																Edit Modal has opened
																<button onClick={() => closeEditModal(card)}>Close edit Modal</button>
															</div>
														</li>
													);
												})}
												{list.editMode ? (
													<>
														<input
															type='text'
															name='newCard'
															onChange={handleChange}
															//   onBlur={updateCard}
														/>
														<button onClick={() => addNewCard(list)}>add</button>
													</>
												) : (
													<div className='add-card pointer' onClick={() => editNewCard(list)}>
														+ add new card
													</div>
												)}
											</ul>
										</div>
									);
							  })
							: null}
						{!newList ? (
							<div className='add-list pointer' onClick={() => setNewList(true)}>
								add new group
							</div>
						) : (
							<div className='add-list-options'>
								<input type='text' name='new-list-name' placeholder='Enter list title' onChange={handleNewList} />
								<button onClick={addNewGroup}>Add List</button>
								<button onClick={() => setNewList(false)}>X</button>
							</div>
						)}
					</div>
					{filterModal && <BoardFilter FilterBoard={FilterBoard} />}
					<Route component={CardDetails} path={`/board/:boardId/:cardId/:listId`} />
				</div>
			) : (
				<div>Loading...</div>
			)}
			<div></div>
		</section>
	);
};
