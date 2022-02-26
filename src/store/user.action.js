import {userService} from '../services/user.service.js';

export const setUsers = (users) => {
	return (dispatch) => {
		dispatch({type: 'SET_USERS', users});
	};
};

export const setUser = (user, type) => {
	return async (dispatch) => {
		try {
			let loggedInUser;
			if (type === 'login') {
				loggedInUser = await userService.login(user);
			} else if (type === 'signup') {
				loggedInUser = await userService.signup(user);
			}
			dispatch({type: 'SET_USER', loggedInUser});
		} catch (err) {
			console.log('could not get user ', err);
		}
	};
};
