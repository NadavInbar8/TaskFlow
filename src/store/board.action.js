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
	return async (dispatch) => {
		try {
			const savedBoard = await boardService.save(board);
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
			dispatch({type: 'SET_BOARD', currBoard});
		} catch (err) {
			console.log('couldnt load board', err);
		}
	};
}

export function updateBoard(board) {
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
