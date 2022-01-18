const initialState = {
  toys: [],
  filterBy: null,
  isModalShown: false,
};

export function listReducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case 'SET_TOYS':
      newState = { ...state, toys: [...action.toys] };
      break;

    case 'ADD_TOY':
      newState = { ...state, toys: [...state.toys, action.savedToy] };
      break;

    case 'REMOVE_TOY':
      newState = {
        ...state,
        toys: state.toys.filter((toy) => toy._id !== action.toyId),
      };
      break;

    case 'UPDATE_TOY':
      newState = {
        ...state,
        toys: state.toys.map((toy) => {
          console.log(toy, action.savedToy);
          return toy._id === action.savedToy._id ? action.savedToy : toy;
        }),
      };
      break;

    case 'SET_FILTER_BY':
      newState = {
        ...state,
        filterBy: action.filterBy,
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
