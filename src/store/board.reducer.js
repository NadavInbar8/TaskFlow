const initialState = {
  boards: [],
  currBoard: null,
  // isModalShown: false,
};

export function boardReducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case 'SET_BOARDS':
      newState = { ...state, boards: [...action.boards] };

      break;
    case 'UPDATE_BOARDS':
      newState = {
        ...state,
        boards: state.boards.map((board) => {
          // console.log(board, action.updatedBoard);
          return board._id === action.updatedBoard._id
            ? action.updatedBoard
            : board;
        }),
      };
      break;

    case 'ADD_BOARD':
      newState = { ...state, boards: [...state.boards, action.savedBoard] };
      break;

    case 'ADD_CARD':
      newState = { ...state, currBoard: action.currBoard };
      break;

    case 'SET_BOARD':
      newState = { ...state, currBoard: action.currBoard };
      break;

    case 'REMOVE_BOARD':
      newState = {
        ...state,
        boards: state.boards.filter((board) => board._id !== action.boardId),
      };
      break;

    case 'UPDATE_BOARD':
      newState = {
        ...state,
        boards: state.boards.map((board) => {
          console.log(board, action.savedBoard);
          return board._id === action.savedBoard._id
            ? action.savedBoard
            : board;
        }),
      };
      break;

    case 'UPDATE_CURRBOARD':
      newState = {
        ...state,
        currBoard: action.updatedBoard,
      };
      break;

    case 'TOGGLE_MODAL':
      console.log('in reducer toggling');
      newState = {
        ...state,
        isModalShown: !state.isModalShown,
      };
      break;

    default:
  }

  return newState;
}

// case 'SET_FILTER_BY':
// 	newState = {
// 		...state,
// 		filterBy: action.filterBy,
// 	};
// 	break;
