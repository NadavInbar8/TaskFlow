import {storageService} from './async-storage.service';
import {utilService} from './util.service';
import {httpService} from './http.service.js';
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
	remove,
	// update,
	// changeScore
};

// To help debugging from console
// window.userService = userService;

async function query() {
	// let boards = await storageService.query('board');
	// return boards;
	const boards = await httpService.get(`board`);
	console.log(boards);

	return boards;
}

async function getById(boardId) {
	console.log(boardId);
	// const board = await storageService.get('board', boardId);
	const board = await httpService.get(`board/${boardId}`);
	// gWatchedUser = user;
	return board;
}

async function save(board) {
	if (!board.groups) {
		const emptyBoard = _getEmptyBoard(board);
		return await httpService.post('board', emptyBoard);
	} else {
		return await httpService.put(`board/${board._id}`, board);
	}
}

async function remove(boardId) {
	// return storageService.remove('board', boardId);
	return await httpService.delete(`board/${boardId}`);
}

// function _saveToStorage() {
//   localStorage.setItem(STORAGE_KEY_BOARD, JSON.stringify(board));
// }
// function consolelogjson() {
// return JSON.stringify({
//   _id: utilService.makeId(),
//   title: 'backboard',
//   starred: false,
//   createdAt: 1589983468418,
//   createdBy: {
//     _id: 'u101',
//     fullname: 'Guest Guestosh',
//     imgUrl: 'https://avatarfiles.alphacoders.com/196/196630.jpg',
//   },
//   style: {
//     backgroundColor: 'red',
//     userClicked: true,
//   },
//   labelOptions: [
//     { id: 1, color: 'green', name: '' },
//     { id: 2, color: 'yellow', name: '' },
//     { id: 3, color: 'orange', name: '' },
//     { id: 4, color: 'red', name: '' },
//     { id: 5, color: 'purple', name: '' },
//     { id: 6, color: 'blue', name: '' },
//     { id: 7, color: 'dark-blue', name: '' },
//   ],
//   labels: [
//     {
//       id: 'l101',
//       title: 'Done',
//       color: '#61bd4f',
//     },
//   ],
//   members: [
//     {
//       _id: 'u101',
//       fullname: 'Tal Tarablus',
//       imgUrl: 'https://www.google.com',
//       initials: 'TT',
//     },
//   ],
//   groupsOrder: ['g101', 'g102'],
//   groups: [
//     {
//       id: 'g101',
//       title: 'Group 1',
//       tasksIds: ['c101', 'c102'],
//       tasks: [
//         {
//           id: 'c101',
//           title: 'Replace logo',
//         },
//         {
//           id: 'c102',
//           title: 'Add Samples',
//         },
//       ],
//       style: {},
//       editMode: false,
//     },
//     {
//       id: 'g102',
//       title: 'Group 2',
//       tasksIds: ['c103', 'c104'],
//       tasks: [
//         {
//           id: 'c103',
//           title: 'Do that',
//         },
//         {
//           id: 'c104',
//           title: 'Help me',
//           status: 'in-progress',
//           description: 'description',
//           comments: [
//             {
//               id: 'ZdPnm',
//               initials: 'YB',
//               txt: 'also @yaronb please CR this',
//               createdAt: 1590999817436.0,
//               byMember: {
//                 _id: 'u101',
//                 initials: 'TT',
//                 fullname: 'Tal Tarablus',
//                 imgUrl:
//                   'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
//               },
//             },
//           ],
//           checklists: [
//             {
//               id: 'YEhmF',
//               title: 'Checklist',
//               todos: [
//                 {
//                   id: '212jX',
//                   title: 'To Do 1',
//                   isDone: false,
//                 },
//               ],
//             },
//           ],
//           members: [
//             {
//               _id: 'u101',
//               username: 'Tal',
//               fullname: 'Tal Tarablus',
//               initials: 'TT',
//               imgUrl:
//                 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
//             },
//           ],
//           labelIds: ['l101', 'l102'],
//           createdAt: 1590999730348,
//           dueDate: 16156215211,
//           byMember: {
//             _id: 'u101',
//             username: 'Tal',
//             fullname: 'Tal Tarablus',
//             initials: 'TT',
//             imgUrl:
//               'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
//           },
//           style: {
//             bgColor: '#26de81',
//           },
//         },
//       ],
//       style: {},
//       editMode: false,
//     },
//   ],
//   activities: [
//     {
//       id: 'a101',
//       txt: 'Changed Color',
//       createdAt: 154514,
//       byMember: {
//         _id: 'u101',
//         fullname: 'Abi Abambi',
//         imgUrl: 'http://some-img',
//         initials: 'AA',
//       },
//       task: {
//         id: 'c101',
//         title: 'Replace Logo',
//       },
//     },
//   ],
//   // for monday
//   cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
// });
// // }

function _getEmptyBoard(board) {
	console.log(board);
	return {
		title: board.title,
		starred: false,
		createdAt: 1589983468418,
		createdBy: board.createdBy
			? board.createdBy
			: {
					_id: 'u101',
					fullname: 'Guest Guestosh',
					imgUrl: 'https://avatarfiles.alphacoders.com/196/196630.jpg',
			  },
		style: {
			backgroundColor: board.style.backgroundColor,
			userClicked: true,
		},
		labelOptions: [
			{id: 1, color: 'green', name: ''},
			{id: 2, color: 'yellow', name: ''},
			{id: 3, color: 'orange', name: ''},
			{id: 4, color: 'red', name: ''},
			{id: 5, color: 'purple', name: ''},
			{id: 6, color: 'blue', name: ''},
		],
		labels: [
			{
				id: 'l101',
				title: 'Done',
				color: '#61bd4f',
			},
		],
		members: board.members,
		// members: [
		// 	{
		// 		_id: 'u101',
		// 		fullname: 'Tal Tarablus',
		// 		imgUrl: 'https://www.google.com',
		// 		initials: 'TT',
		// 	},
		// ],
		groupsOrder: ['g101', 'g102'],
		groups: [
			{
				id: 'g101',
				title: 'Group 1',
				tasksIds: ['c101', 'c102'],
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
				editMode: false,
			},
			{
				id: 'g102',
				title: 'Group 2',
				tasksIds: ['c103', 'c104'],
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
								initials: 'YB',
								txt: 'also @yaronb please CR this',
								createdAt: 1590999817436.0,
								byMember: {
									_id: 'u101',
									initials: 'TT',
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
								initials: 'TT',
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
							initials: 'TT',
							imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
						},
						style: {
							bgColor: '#26de81',
						},
					},
				],
				style: {},
				editMode: false,
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
					initials: 'AA',
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
