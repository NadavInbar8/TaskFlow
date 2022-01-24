import { userService } from '../services/user.service.js';

export function setUser(user) {
  console.log('in set user', user);
  return async (dispatch) => {
    try {
      const loggedInUser = await userService.login(user);
      console.log(loggedInUser);
      dispatch({ type: 'SET_USER', loggedInUser });
    } catch (err) {
      console.log('could not get boards ', err);
    }
  };
}
