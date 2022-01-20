import {boardService} from '../services/board.service.js';

export function loadBoards(filterBy = null) {
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

export function loadBoard(boardId, filterBy) {
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

// export function removeToy(toyId) {
//   return (dispatch) => {
//     ToyService.remove(toyId)
//       .then(() => {
//         dispatch({ type: 'REMOVE_TOY', toyId });
//       })
//       .catch((err) => {
//         console.log('cannot delete toy');
//       });
//   };
// }

// export function updateToy(toy) {
//   console.log('inside the updated', toy);
//   return (dispatch) => {
//     ToyService.save(toy)
//       .then((savedToy) => {
//         console.log('Added Succesfully!');
//         console.log(savedToy);
//         dispatch({ type: 'UPDATE_TOY', savedToy });
//       })
//       .catch((err) => {
//         console.log('cannot upadte toy from 49', err);
//       });
//   };
// }

// export function setFilterBy(filterBy) {
//   console.log(filterBy);
//   return (dispatch) => {
//     ToyService.query(filterBy).then((toys) => {
//       console.log(toys);
//       dispatch({ type: 'SET_FILTER_BY', filterBy });
//       dispatch({ type: 'SET_TOYS', toys });
//     });
//   };
// }

// export function toggleModal() {
//   console.log('action toggling');
//   return (dispatch) => {
//     dispatch({ type: 'TOGGLE_MODAL' });
//   };
// }
