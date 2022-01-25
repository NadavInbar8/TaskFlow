import {userService} from '../services/user.service.js';

export function setUser(user) {
	console.log('in set user', user);
	return async (dispatch) => {
		try {
			let loggedInUser;
			user ? (loggedInUser = await userService.login(user)) : await userService.logout();
			dispatch({type: 'SET_USER', loggedInUser});
		} catch (err) {
			console.log('could not get boards ', err);
		}
	};
}
