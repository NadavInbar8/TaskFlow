import {storageService} from './async-storage.service';
import {utilService} from './util.service';
// import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
const STORAGE_KEY_BOARD = 'board';
// var gWatchedUser = null;

export const boardService = {
	// login,
	// logout,
	// signup,
	// getLoggedinUser,
	query,
	getById,
	save,
	// remove,
	// update,
	// changeScore
};

// To help debugging from console
// window.userService = userService;

async function query() {
	let board = await storageService.query('board');
	return board;
	//   return httpService.get(`user`);
}

async function getById(boardId) {
	const board = await storageService.get('board', boardId);

	// const user = await httpService.get(`user/${userId}`)
	// gWatchedUser = user;
	return board;
}
// function remove(userId) {
//     // return storageService.remove('user', userId)
//     return httpService.delete(`user/${userId}`)
// }

// async function update(user) {
//     // await storageService.put('user', user)
//     user = await httpService.put(`user/${user._id}`, user)
//     // Handle case in which admin updates other user's details
//     if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
//     return user;
// }

// async function login(userCred) {
//     // const users = await storageService.query('user')
//     // const user = users.find(user => user.username === userCred.username)
//     // return _saveLocalUser(user)

//     const user = await httpService.post('auth/login', userCred)
//     // socketService.emit('set-user-socket', user._id);
//     if (user) return _saveLocalUser(user)
// }
// async function signup(userCred) {
//     // userCred.score = 10000;
//     // const user = await storageService.post('user', userCred)
//     const user = await httpService.post('auth/signup', userCred)
//     // socketService.emit('set-user-socket', user._id);
//     return _saveLocalUser(user)
// }
// async function logout() {
//     sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
//     // socketService.emit('unset-user-socket');
//     return await httpService.post('auth/logout')
// }

// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }

// function _saveLocalUser(user) {
//     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
//     return user
// }

// function getLoggedinUser() {
//     return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
// }

// // (async ()=>{
// //     await userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
// //     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
// //     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// // })();

// // This IIFE functions for Dev purposes
// // It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
//     // Dev Helper: Listens to when localStorage changes in OTHER browser

//     // Here we are listening to changes for the watched user (comming from other browsers)
//     window.addEventListener('storage', async () => {
//         if (!gWatchedUser) return;
//         const freshUsers = await storageService.query('user')
//         const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
//         if (!watchedUser) return;
//         if (gWatchedUser.score !== watchedUser.score) {
//             console.log('Watched user score changed - localStorage updated from another browser')
//             socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
//         }
//         gWatchedUser = watchedUser
//     })
// })();

// // This is relevant when backend is connected
// // (async () => {
// //     var user = getLoggedinUser()
// //     if (user) socketService.emit('set-user-socket', user._id)
// // })();

const boards = [
	{
		_id: 'b101',
		title: 'Robot dev proj',
		createdAt: 1589983468418,
		createdBy: {
			_id: 'u101',
			fullname: 'Abi Abambi',
			imgUrl: 'http://some-img',
		},
		style: {},
		labels: [
			{
				id: 'l101',
				title: 'Done',
				color: '#61bd4f',
			},
		],
		members: [
			{
				_id: 'u101',
				fullname: 'Tal Tarablus',
				imgUrl: 'https://www.google.com',
			},
		],
		groups: [
			{
				id: 'g101',
				title: 'Group 1',
				tasks: [
					{
						id: 'c101',
						title: 'Replace logo',
					},
					{
						id: 'c102',
						title: 'Add Samples',
					},
				],
				style: {},
			},
			{
				id: 'g102',
				title: 'Group 2',
				tasks: [
					{
						id: 'c103',
						title: 'Do that',
					},
					{
						id: 'c104',
						title: 'Help me',
						status: 'in-progress',
						description: 'description',
						comments: [
							{
								id: 'ZdPnm',
								txt: 'also @yaronb please CR this',
								createdAt: 1590999817436.0,
								byMember: {
									_id: 'u101',
									fullname: 'Tal Tarablus',
									imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
								},
							},
						],
						checklists: [
							{
								id: 'YEhmF',
								title: 'Checklist',
								todos: [
									{
										id: '212jX',
										title: 'To Do 1',
										isDone: false,
									},
								],
							},
						],
						members: [
							{
								_id: 'u101',
								username: 'Tal',
								fullname: 'Tal Tarablus',
								imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
							},
						],
						labelIds: ['l101', 'l102'],
						createdAt: 1590999730348,
						dueDate: 16156215211,
						byMember: {
							_id: 'u101',
							username: 'Tal',
							fullname: 'Tal Tarablus',
							imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
						},
						style: {
							bgColor: '#26de81',
						},
					},
				],
				style: {},
			},
		],
		activities: [
			{
				id: 'a101',
				txt: 'Changed Color',
				createdAt: 154514,
				byMember: {
					_id: 'u101',
					fullname: 'Abi Abambi',
					imgUrl: 'http://some-img',
				},
				task: {
					id: 'c101',
					title: 'Replace Logo',
				},
			},
		],
		// for monday
		cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
	},
	{
		_id: 'b102',
		title: 'developers scedule',
		createdAt: 1589983468418,
		createdBy: {
			_id: 'u102',
			fullname: 'odedkovo2',
			imgUrl: 'http://some-img',
		},
		style: {},
		labels: [
			{
				id: 'l101',
				title: 'Done',
				color: '#61bd4f',
			},
		],
		members: [
			{
				_id: 'u101',
				fullname: 'oded kovo',
				imgUrl: 'https://www.google.com',
			},
		],
		groups: [
			{
				id: 'o123',
				title: 'Group 1',
				tasks: [
					{
						id: 'c104',
						title: 'check if multiple boards work',
					},
					{
						id: 'c105',
						title: 'try to get right card to card details',
					},
				],
				style: {},
			},
			{
				id: 'o456',
				title: 'Group 2',
				tasks: [
					{
						id: 'u456',
						title: 'learn fullstack',
					},
					{
						id: 'u466',
						title: 'help!',
						status: 'in-progress',
						description: 'description',
						comments: [
							{
								id: 'ZdPnm',
								txt: 'also @yaronb please CR this',
								createdAt: 1590999817436.0,
								byMember: {
									_id: 'u101',
									fullname: 'Tal Tarablus',
									imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
								},
							},
						],
						checklists: [
							{
								id: 'YEhmF',
								title: 'Checklist',
								todos: [
									{
										id: '212jX',
										title: 'To Do 1',
										isDone: false,
									},
								],
							},
						],
						members: [
							{
								_id: 'u101',
								username: 'Tal',
								fullname: 'Tal Tarablus',
								imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
							},
						],
						labelIds: ['l101', 'l102'],
						createdAt: 1590999730348,
						dueDate: 16156215211,
						byMember: {
							_id: 'u101',
							username: 'Tal',
							fullname: 'Tal Tarablus',
							imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
						},
						style: {
							bgColor: '#26de81',
						},
					},
				],
				style: {},
			},
		],
		activities: [
			{
				id: 'a101',
				txt: 'Changed Color',
				createdAt: 154514,
				byMember: {
					_id: 'u101',
					fullname: 'Abi Abambi',
					imgUrl: 'http://some-img',
				},
				task: {
					id: 'c101',
					title: 'Replace Logo',
				},
			},
		],
		// for monday
		cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
	},
];

async function save(board) {
	if (!board) {
		const board = _getEmptyBoard();
		boards.push(board);
		_saveToStorage();
		return board;
	}
}

// _saveToStorage();
function _saveToStorage() {
	localStorage.setItem(STORAGE_KEY_BOARD, JSON.stringify(boards));
}

function _getEmptyBoard() {
	return {
		_id: utilService.makeId(),
		title: 'Robot dev proj',
		createdAt: 1589983468418,
		createdBy: {
			_id: 'u101',
			fullname: 'Abi Abambi',
			imgUrl: 'http://some-img',
		},
		style: {},
		labels: [
			{
				id: 'l101',
				title: 'Done',
				color: '#61bd4f',
			},
		],
		members: [
			{
				_id: 'u101',
				fullname: 'Tal Tarablus',
				imgUrl: 'https://www.google.com',
			},
		],
		groups: [
			{
				id: 'g101',
				title: 'Group 1',
				tasks: [
					{
						id: 'c101',
						title: 'Replace logo',
					},
					{
						id: 'c102',
						title: 'Add Samples',
					},
				],
				style: {},
			},
			{
				id: 'g102',
				title: 'Group 2',
				tasks: [
					{
						id: 'c103',
						title: 'Do that',
					},
					{
						id: 'c104',
						title: 'Help me',
						status: 'in-progress',
						description: 'description',
						comments: [
							{
								id: 'ZdPnm',
								txt: 'also @yaronb please CR this',
								createdAt: 1590999817436.0,
								byMember: {
									_id: 'u101',
									fullname: 'Tal Tarablus',
									imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
								},
							},
						],
						checklists: [
							{
								id: 'YEhmF',
								title: 'Checklist',
								todos: [
									{
										id: '212jX',
										title: 'To Do 1',
										isDone: false,
									},
								],
							},
						],
						members: [
							{
								_id: 'u101',
								username: 'Tal',
								fullname: 'Tal Tarablus',
								imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
							},
						],
						labelIds: ['l101', 'l102'],
						createdAt: 1590999730348,
						dueDate: 16156215211,
						byMember: {
							_id: 'u101',
							username: 'Tal',
							fullname: 'Tal Tarablus',
							imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
						},
						style: {
							bgColor: '#26de81',
						},
					},
				],
				style: {},
			},
		],
		activities: [
			{
				id: 'a101',
				txt: 'Changed Color',
				createdAt: 154514,
				byMember: {
					_id: 'u101',
					fullname: 'Abi Abambi',
					imgUrl: 'http://some-img',
				},
				task: {
					id: 'c101',
					title: 'Replace Logo',
				},
			},
		],
		// for monday
		cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
	};
}
