import React, {useEffect, useState} from 'react';
import {CardDetails} from './CardDetails.jsx';
import {Route, Switch} from 'react-router';
import {Link, useParams} from 'react-router-dom';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {loadBoard, addCard, updateBoard} from '../store/board.action.js';
import {BoardFilter} from '../cmps/Boardfilter.jsx';
import {utilService} from '../services/util.service.js';
import addUser from '../assets/imgs/add-user.png';
import {over} from 'lodash';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import initialData from './initialData.js';
import Group from '../cmps/Group.jsx';

export const Board = () => {
	const {boardId} = useParams();
	const {board} = useSelector((state) => ({board: state.boardModule.currBoard}), shallowEqual);
	const dispatch = useDispatch();

	///// useStates /////
	const [filteredBoard, setFilteredBoard] = useState({});
	const [selectedCard, setSelectedCard] = useState({});
	const [newList, setNewList] = useState(false);
	const [listName, setListName] = useState('');
	const [newCard, setNewCard] = useState({});
	const [overlay, setOverlay] = useState(false);
	const [forceRender, setForceRender] = useState(true);

	////// modal stuff /////
	const [editModal, setEditModal] = useState(false);
	const [memberModal, setMemeberModal] = useState(false);
	const [labelsModal, setLabelsModal] = useState(false);
	const [datesModal, setDatesModal] = useState(false);
	const [filterModal, setFilterModal] = useState(false);
	const [starStatus, setStarStatus] = useState(false);

	///// Tom useStates /////
	const [boardTitleInput, setBoardTitleInput] = useState();
	const toggleStarring = () => {
		setStarStatus(!starStatus);
	};
	const toggleModal = (type) => {
		type === 'filter' && setFilterModal(!filterModal);
	};

	///// useEffect /////

	useEffect(() => {}, [filteredBoard]);

	useEffect(() => {
		dispatch(loadBoard(boardId));
		if (board) setBoardTitleInput(board.title);
	}, []);

	useEffect(() => {
		dispatch(loadBoard(boardId));
	}, [forceRender]);

	useEffect(() => {
		if (board) setBoardTitleInput(board.title);
	}, [board]);

	function handleChange({target}) {
		const value = target.value;
		setNewCard({...newCard, title: value});
	}

	///// Functions /////

	function FilterBoard(ev, filter = null) {
		ev.preventDefault();

		let {name} = filter;
		if (filter.name === '') {
			setForceRender(!forceRender);
		} else {
			name = name.toLowerCase();
			const newFilteredBoard = board;
			// for (var i = 0; i < board.groups.length; i++) {
			// 	for (var j = 0; j < board.groups[i].tasks.length; j++) {
			// 		if (board.groups[i].tasks[j] !== newFilteredBoard.groups[i].tasks[j]) console.log('different');
			// 	}
			// }
			// newFilteredBoard.groups = newFilteredBoard.groups.map((group) =>
			// 	group.tasks.filter((task) => task.title.toLowerCase().includes(name))
			// );
			const filteredGroups = newFilteredBoard.groups.filter((group) => group.title.toLowerCase().includes(name));

			// filteredBoard.groups = filteredGroups.forEach(group);
			newFilteredBoard.groups = filteredGroups;
			setFilteredBoard(newFilteredBoard);
		}
	}

	const editNewCard = (list) => {
		setNewCard({...newCard, id: utilService.makeId()});
		list.editMode = true;
	};

	function handleBoardTitleChange({target}) {
		if (!target) return;
		console.log(target);
		// const field = target.name;
		const value = target.value;
		setBoardTitleInput(value);
	}

	const addNewCard = (list) => {
		let listIdx = board.groups.findIndex((group) => group.id === list.id);
		list.tasks.push(newCard);
		const updatedBoard = {...board};
		updatedBoard.groups[listIdx] = list;
		updatedBoard.groups[listIdx].editMode = false;
		dispatch(updateBoard(updatedBoard));
	};

	const openEditModal = (card) => {
		toggleEditModal();
		setSelectedCard(card);
	};

	const closeEditModal = () => {
		setSelectedCard({});
		setEditModal(false);
		toggleEditModal();
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
		const updatedBoard = {...board};
		updatedBoard.groups = updatedBoard.groups.filter((group) => group.id !== list.id);
		dispatch(updateBoard(updatedBoard));
		setForceRender(!forceRender);
	};
	const updateBoardTitle = () => {
		const updatedBoard = {...board};
		updatedBoard.title = boardTitleInput;
		dispatch(updateBoard(updatedBoard));
		setForceRender(!forceRender);
	};

	// const editNewCard = (list) => {
	//   setNewCard({ ...newCard, id: utilService.makeId() });
	//   list.editMode = true;
	//   setEdit(true);
	// };

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

	// const addNewCard = (list) => {
	//   let listIdx = board.groups.findIndex((group) => group.id === list.id);
	//   list.tasks.push(newCard);
	//   const updatedBoard = { ...board };
	//   updatedBoard.groups[listIdx] = list;
	//   updatedBoard.groups[listIdx].editMode = false;
	//   setEdit(false);
	//   dispatch(updateBoard(updatedBoard));
	// };

	// const openEditModal = (card) => {
	//   // card.editMode = true;
	//   setSelectedCard(card);
	//   // setEditModal(true);
	//   // console.log(card);
	// };
	// const closeEditModal = (card) => {
	//   // change to toggle or save later
	//   // console.log('selected card', selecetCard);
	//   setSelectedCard({});
	//   setEditModal(false);
	//   // card.editMode = false;
	// };

	// const handleNewList = ({ target }) => {
	//   const value = target.value;
	//   setListName(value);
	// };
	// const addNewGroup = () => {
	//   const updatedBoard = { ...board };
	//   const newGroup = {
	//     id: utilService.makeId(),
	//     style: {},
	//     tasks: [],
	//     title: listName,
	//   };
	//   updatedBoard.groups.push(newGroup);
	//   dispatch(updateBoard(updatedBoard));
	//   setNewList(false);
	// };

	const toggleEditModal = () => {
		setOverlay(!overlay);
	};

	const copyCard = (list, card) => {
		const updatedBoard = {...board};
		const copiedCard = {...card, id: utilService.makeId()};
		let listIdx = updatedBoard.groups.findIndex((group) => group.id === list.id);
		updatedBoard.groups[listIdx].tasks.push(copiedCard);
		closeEditModal();
		dispatch(updateBoard(updatedBoard));
		setForceRender(!forceRender);
	};

	const deleteCard = (list, card) => {
		const updatedBoard = {...board};
		let listIdx = updatedBoard.groups.findIndex((group) => group.id === list.id);
		updatedBoard.groups[listIdx].tasks = updatedBoard.groups[listIdx].tasks.filter((task) => task.id !== card.id);
		closeEditModal();
		dispatch(updateBoard(updatedBoard));
		setForceRender(!forceRender);
	};

	// const trying = () => {
	//   if (board) {
	//     const tasks = { ...board.groups[0].tasks };
	//     const lists = { ...board.groups };
	//     console.log(lists);
	//     const initialData = {
	//       tasks: tasks,
	//       columns: lists,
	//       columnOrder: ['0', '1'],
	//     };
	//   }
	// };
	const [data, setData] = useState(initialData);
	const onDragEnd = (res) => {
		//todo
		const {destination, source, draggableId, type} = res;

		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		if (type === 'column') {
			const newColumnOrder = Array.from(data.columnOrder);
			newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, draggableId);
			const newData = {
				...data,
				columnOrder: newColumnOrder,
			};
			setData(newData);
		}

		const start = data.columns[source.droppableId];
		const finish = data.columns[destination.droppableId];

		if (start === finish) {
			const column = data.columns[source.droppableId];
			const newTaskIds = Array.from(column.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);
			const newColumn = {...column, taskIds: newTaskIds};
			const newData = {
				...data,
				columns: {...data.columns, [newColumn.id]: newColumn},
			};
			setData(newData);
			return;
		}

		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds,
		};
		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			taskIds: finishTaskIds,
		};

		const newData = {
			...data,
			columns: {
				...data.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};
		setData(newData);
	};

	return (
		<section>
			<div className={overlay ? 'overlay' : 'overlay hidden'} onClick={closeEditModal}></div>
			{board ? (
				<div>
					<header className='board-header'>
						<div className='header-left-container flex-center'>
							<input
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
					<div className='board flex pink'>
						<DragDropContext onDragEnd={onDragEnd}>
							<Droppable droppableId='all-columns' direction='horizontal' type='column'>
								{(provided) => (
									<div className='Container flex' {...provided.droppableProps} ref={provided.innerRef}>
										{data.columnOrder.map((columnId, index) => {
											const column = data.columns[columnId];
											const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
											return <Group key={column.id} column={column} tasks={tasks} index={index} />;
										})}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>

						{board.groups
							? board.groups.map((list) => {
									return (
										<div className='board-list flex-column'>
											<h3>{list.title}</h3>
											<button onClick={() => deleteList(list)}>delete list</button>
											<ul>
												{list.tasks.map((card) => {
													return selectedCard.id !== card.id ? (
														<li key={card.id} className='board-card'>
															<Link to={`/board/${boardId}/${card.id}/${list.id}`}>{card.title}</Link>
															<button onClick={() => openEditModal(card)}>edit</button>
														</li>
													) : (
														<li key={card.id} className='board-card overlaySee'>
															<input type='text' defaultValue={card.title} onChange={handleChange} />
															<div className='add-card' onClick={() => editCard(list, card)}>
																save
															</div>
															<div className='edit-modal'>
																<ul>
																	<li>
																		<Link onClick={closeEditModal} to={`/board/${boardId}/${card.id}/${list.id}`}>
																			Open Card
																		</Link>
																	</li>
																	<li>Edit Labels</li>
																	<li>Change Members</li>
																	<li>Change Cover</li>
																	<li onClick={() => copyCard(list, card)}>Copy</li>
																	<li>Edit Dates</li>
																	<li onClick={() => deleteCard(list, card)}>Archive</li>
																</ul>
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
													<div className='add-card' onClick={() => editNewCard(list)}>
														+ add new card
													</div>
												)}
											</ul>
										</div>
									);
							  })
							: null}
						{!newList ? (
							<div className='add-list' onClick={() => setNewList(true)}>
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
