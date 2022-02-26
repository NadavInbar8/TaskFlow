// import {storageService} from './async-storage.service';
// import {socketService, SOCKET_EVENT_USER_UPDATED} from './socket.service';
import {httpService} from './http.service';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser';

export const userService = {
	login,
	logout,
	signup,
	getLoggedinUser,
	getUsers,
	getById,
	remove,
	update,
	connectGuestUser,
};

window.userService = userService;

async function getUsers() {
	const users = await httpService.get(`user`);
	return users;
}

async function getById(userId) {
	const user = await httpService.get(`user/${userId}`);
	return user;
}
function remove(userId) {
	return httpService.delete(`user/${userId}`);
}

async function update(user) {
	user = await httpService.put(`user/${user._id}`, user);
	// return user;
}

async function login(userCred) {
	if (userCred.fullName === 'Guest') {
		connectGuestUser();
	}
	userCred.password = userCred.password.toString();
	const user = await httpService.post('auth/login', userCred);
	await _saveLocalUser(user);
	return user;
}

async function signup(userCred) {
	userCred.password = userCred.password.toString();
	const user = await httpService.post('auth/signup', userCred);
	return _saveLocalUser(user);
	// socketService.emit('set-user-socket', user._id);
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
	// socketService.emit('unset-user-socket');
	// return await httpService.post('auth/logout')
}

function _saveLocalUser(user) {
	console.log('Saved user in session storage');
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
	return user;
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
}

async function connectGuestUser() {
	const guestUser = {
		email: 'guest@taskflow.com',
		password: '1234',
		fullName: 'Guest',
		initials: 'G',
		imgUrl: 'https://i.pinimg.com/originals/27/b1/1e/27b11ec85bb8f88b0c824991c76d9b5b.gif',
	};
	_saveLocalUser(guestUser);
	return guestUser;
}

// signup({
// 	email: 'guest@taskflow.com',
// 	password: '1234',
// 	fullName: 'Guest',
// 	initials: 'G',
// 	imgUrl: 'https://i.pinimg.com/originals/27/b1/1e/27b11ec85bb8f88b0c824991c76d9b5b.gif',
// });
