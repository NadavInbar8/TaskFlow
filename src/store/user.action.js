import {userService} from '../services/user.service.js';

export const setUsers = (users) => {
	return (dispatch) => {
		dispatch({type: 'SET_USERS', users});
	};
};

export const setUser = (user, type) => {
	console.log('in set user', user);
	return async (dispatch) => {
		try {
			let loggedInUser;
			if (type === 'login') {
				console.log('inlogin');
				loggedInUser = await userService.login(user);
			} else if (type === 'signup') {
				console.log('in signup');
				console.log(user);
				loggedInUser = await userService.signup(user);
				console.log(loggedInUser);
			}
			dispatch({type: 'SET_USER', loggedInUser});
		} catch (err) {
			console.log('could not get user ', err);
		}
	};
};
