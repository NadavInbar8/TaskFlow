import { userService } from '../services/user.service.js';

export function setUser(user, type) {
  console.log('in set user', user);
  return async (dispatch) => {
    try {
      let loggedInUser;
      if (type === 'login') {
        console.log('inlogin');
        loggedInUser = await userService.login(user);
      } else if (type === 'signup') {
        console.log('in signup');
        loggedInUser = await userService.signup(user);
        console.log(loggedInUser);
      }
      dispatch({ type: 'SET_USER', loggedInUser });
    } catch (err) {
      console.log('could not get boards ', err);
    }
  };
}
