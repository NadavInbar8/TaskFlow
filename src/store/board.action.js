/* eslint-disable */
import {boardService} from '../services/board.service.js';

export function loadBoards() {
	return async (dispatch) => {
		try {
			const boards = await boardService.query();
			const board = boards[0];
			dispatch({type: 'SET_BOARDS', boards});
			dispatch({type: 'SET_BOARD', board});
		} catch (err) {
			console.log('could not get boards ', err);
		}
	};
}

export function addBoard(board) {
	console.log(board);
	return async (dispatch) => {
		try {
			const savedBoard = await boardService.save(board);
			console.log(savedBoard);
			console.log('Added Succesfully!');
			dispatch({type: 'ADD_BOARD', savedBoard});
		} catch (err) {
			console.log('cannot add board', err);
		}
	};
}

export function addCard(card, board, group) {
	return async (dispatch) => {
		try {
			const groupIndex = board.groups.findIndex((groupF) => groupF.id === group.id);
			const newBoard = board.group[groupIndex].push(card);
			dispatch({type: 'ADD_CARD', newBoard});
		} catch (err) {
			console.log('cannot add card ', err);
		}
	};
}

export function loadBoard(boardId) {
	return async (dispatch) => {
		try {
			let currBoard = await boardService.getById(boardId);
			// console.log(currBoard);
			dispatch({type: 'SET_BOARD', currBoard});
		} catch (err) {
			console.log('couldnt load board', err);
		}
	};
}

export function updateBoard(board) {
	// console.log(board);
	return async (dispatch) => {
		try {
			const updatedBoard = await boardService.save(board);
			// console.log(updatedBoard);
			dispatch({type: 'UPDATE_BOARDS', updatedBoard});
			dispatch({type: 'UPDATE_CURRBOARD', updatedBoard});
		} catch (err) {
			console.log('couldnt update board', err);
		}
	};
}

// export function loadBoard(filterBy) {
//   return async (dispatch) =>{
//     try{
//       const board = await boardService.query(filterBy)
//     }
//   }
// }

export function removeBoard(boardId) {
	return (dispatch) => {
		boardService
			.remove(boardId)
			.then(() => {
				dispatch({type: 'REMOVE_BOARD', boardId});
			})
			.catch((err) => {
				console.log('cannot delete board');
			});
	};
}

export function openModal(modal) {
	return (dispatch) => {
		dispatch({type: 'OPEN_MODAL', modal});
	};
}

// Code to display

// User clicks on "Create" button in the Taskflow app header
{
	/* <li className='create-li'>
	<span className='app-header-span' onClick={() => toggleModal('createModal')}>
		Create
	</span>
	</li>

// Function inside React Component sends an action to open the specific modal in the Redux Store
	const toggleModal = (type) => {
		dispatch(openModal(type));
	};

// The action is sent from the Store to the Reducer
export function openModal(modal) {
	return (dispatch) => {
		dispatch({type: 'OPEN_MODAL', modal});
	};
}

// The reducer updates the global "Modal" state- opening the requested modal and closing all others.
export function modalReducer(state = initialState, action) {
	const initialState = {
		modal: null,
	};

	let newState = state;
	switch (action.type) {
		case 'OPEN_MODAL':
			newState = {
				...state,
				modal: state.modal !== action.modal ? action.modal : null,
			};
			break;
		default:
	}

	return newState;
}

// The create modal opens
{modal === 'createModal' && <CreateModal />} */
}

// export function updateBoard(board) {
//   console.log('inside the updated', board);
//   return (dispatch) => {
//     BoardService.save(board)
//       .then((savedBoard) => {
//         console.log('Added Succesfully!');
//         console.log(savedBoard);
//         dispatch({ type: 'UPDATE_BOARD', savedBoard });
//       })
//       .catch((err) => {
//         console.log('cannot upadte board from 49', err);
//       });
//   };
// }

// export function setFilterBy(filterBy, board) {
// 	let {name} = filterBy;
// 	name = name.toLowerCase();
// 	return (dispatch) => {
// 		try {
// 			const filteredBoard = board;
// 			const filteredGroups = filteredBoard.groups.filter((group) => group.title.toLowerCase().includes(name));
// 			// const filteredTasks = filteredBoard.groups.forEach((group) =>
// 			// 	group.tasks.filter((task) => task.title.toLowerCase().includes(name.toLowerCase()))
// 			// );
// 			// filteredBoard.groups = filteredGroups.forEach(group);
// 			filteredBoard.groups = filteredGroups;
// 			console.log(name);
// 			console.log(filteredBoard);
// 			// dispatch({type: 'SET_FILTER_BY', filterBy});
// 			dispatch({type: 'SET_BOARD', filteredBoard});
// 		} catch (err) {
// 			console.log('couldnt filter', err);
// 		}
// 	};
// }
