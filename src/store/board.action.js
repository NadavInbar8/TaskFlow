import {boardService} from '../services/board.service.js';

export function loadBoards() {
	return async (dispatch) => {
		try {
			const boards = await boardService.query();
			dispatch({type: 'SET_BOARDS', boards});
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

export function openModal(modal) {
	return (dispatch) => {
		dispatch({type: 'OPEN_MODAL', modal});
	};
}
