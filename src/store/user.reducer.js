import { userService } from '../services/user.service.js';

const initialState = {
  loggedInUser: userService.getLoggedinUser(),
};

export function userReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    case 'SET_USER':
      newState = { ...state, user: action.loggedInUser };
      break;
    case 'REMOVE_USER':
      newState = {
        ...state,
        users: state.users.filter((user) => user._id !== action.userId),
      };
      break;
    default:
  }
  return newState;
}
