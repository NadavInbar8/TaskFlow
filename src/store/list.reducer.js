// const initialState = {
// 	lists: [],
// 	filterBy: null,
// 	isModalShown: false,
// };

// export function listReducer(state = initialState, action) {
// 	let newState = state;
// 	switch (action.type) {
// 		case 'SET_LISTS':
// 			newState = {...state, lists: [...action.lists]};
// 			break;

// 		case 'ADD_LIST':
// 			newState = {...state, lists: [...state.lists, action.savedList]};
// 			break;

// 		case 'REMOVE_LIST':
// 			newState = {
// 				...state,
// 				lists: state.lists.filter((list) => list._id !== action.listId),
// 			};
// 			break;

// 		case 'UPDATE_LIST':
// 			newState = {
// 				...state,
// 				lists: state.lists.map((list) => {
// 					console.log(list, action.savedList);
// 					return list._id === action.savedList._id ? action.savedList : list;
// 				}),
// 			};
// 			break;

// 		case 'SET_FILTER_BY':
// 			newState = {
// 				...state,
// 				filterBy: action.filterBy,
// 			};
// 			break;

// 		case 'TOGGLE_MODAL':
// 			console.log('in reducer toggling');
// 			newState = {
// 				...state,
// 				isModalShown: !state.isModalShown,
// 			};
// 			break;

// 		default:
// 	}

// 	return newState;
// }
