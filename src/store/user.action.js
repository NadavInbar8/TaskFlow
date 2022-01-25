import { userService } from '../services/user.service.js';

export function setUser(user, type) {
  console.log('in set user', user);
  return async (dispatch) => {
    try {
      let loggedInUser;
      if (type === 'login') {
        console.log('inlogin');
        user
          ? (loggedInUser = await userService.login(user))
          : await userService.logout();
      } else if (type === 'signup') {
        console.log('in signup');
        user
          ? (loggedInUser = await userService.signup(user))
          : await userService.logout();
      }
      dispatch({ type: 'SET_USER', loggedInUser });
    } catch (err) {
      console.log('could not get boards ', err);
    }
  };
}
