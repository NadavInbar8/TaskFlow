import { storageService } from './async-storage.service';
import { httpService } from './http.service';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setUsers } from '../store/user.action.js';
import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser';
var gWatchedUser = null;

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
  //   changeScore,
};

// To help debugging from console
window.userService = userService;

// getUsers();
async function getUsers() {
  const users = await httpService.get(`user`);
  return users;
}

async function getById(userId) {
  // const user = await storageService.get('user', userId);
  const user = await httpService.get(`user/${userId}`);
  // gWatchedUser = user;
  return user;
}
function remove(userId) {
  // return storageService.remove('user', userId);
  return httpService.delete(`user/${userId}`);
}

async function update(user) {
  // await storageService.put('user', user);
  user = await httpService.put(`user/${user._id}`, user);
  // // Handle case in which admin updates other user's details
  // if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
  // return user;
}

async function login(userCred) {
  userCred.password = userCred.password.toString();
  const user = await httpService.post('auth/login', userCred);
  await _saveLocalUser(user);
  return user;
  // let user = users.find((user) => user.email === userCred.email&&user.password===userCred.password);
  // if (user.password === userCred.password) {
  //   user = getById(user._id);
  //   if (!user) return console.log('you are not registered');
  //   return _saveLocalUser(user);
  // }
}

// signup({
//   email: 'guest@taskflow.com',
//   password: '1234',
//   fullName: 'Guest',
//   initials: 'G',
//   imgUrl:
//     'https://i.pinimg.com/originals/27/b1/1e/27b11ec85bb8f88b0c824991c76d9b5b.gif',
// });

async function signup(userCred) {
  userCred.password = userCred.password.toString();
  console.log('user service user cred', userCred);
  const user = await httpService.post('auth/signup', userCred);
  return _saveLocalUser(user);
  // socketService.emit('set-user-socket', user._id);
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  // socketService.emit('unset-user-socket');
  // return await httpService.post('auth/logout')
}

// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }

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
  };
  await login(guestUser);
}
// (async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })();

// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
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

// This is relevant when backend is connected
// (async () => {
//     var user = getLoggedinUser()
//     if (user) socketService.emit('set-user-socket', user._id)
// })();
