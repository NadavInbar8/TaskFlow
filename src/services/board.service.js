import { storageService } from './async-storage.service';
import { utilService } from './util.service';
import { httpService } from './http.service.js';
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
  // console.log(boards);

  return boards;
}

async function getById(boardId) {
  // console.log(boardId);
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
  // console.log(board);
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
    style: board.style,
    labelOptions: [
      { id: 1, color: 'green', name: '' },
      { id: 2, color: 'yellow', name: '' },
      { id: 3, color: 'orange', name: '' },
      { id: 4, color: 'red', name: '' },
      { id: 5, color: 'purple', name: '' },
      { id: 6, color: 'blue', name: '' },
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
    activities: [],

    cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
  };
}
