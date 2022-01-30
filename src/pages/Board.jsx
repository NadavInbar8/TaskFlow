// React
import React, { useEffect, useState } from 'react';
import { CardDetails } from './CardDetails.jsx';
import { Route, Switch } from 'react-router';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { socket } from '../RootCmp.jsx';
// Redux
import {
  loadBoard,
  addCard,
  updateBoard,
  openModal,
} from '../store/board.action.js';
import { setUsers } from '../store/user.action.js';

// Cmps
import { BoardHeader } from '../cmps/boardCmps/BoardHeader.jsx';
import Group from '../cmps/Group.jsx';

// Utils
import { utilService } from '../services/util.service.js';

// Services
import addUser from '../assets/imgs/add-user.png';
import { userService } from '../services/user.service.js';

// Libs
import { over, update } from 'lodash';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initialData.js';

// Images
import filterSvg from '../assets/imgs/filter-svgs/filter.svg';
import attachment from '../assets/imgs/card-attach.svg';
import cardChecklist from '../assets/imgs/card-checklist.svg';
import dueDate from '../assets/imgs/card-due.svg';
import description from '../assets/imgs/card-desc.svg';
import cardEdit from '../assets/imgs/card-edit.svg';
import dotdotdot from '../assets/imgs/dotdotdot.svg';
import close from '../assets/imgs/close.svg';
import plus from '../assets/imgs/plus.svg';
import plusWhite from '../assets/imgs/plus-white.svg';

////// DND IMPORTS ///////

////////////////////////////////////////////////////

export const Board = () => {
  const { boardId } = useParams();
  const { board } = useSelector(
    (state) => ({ board: state.boardModule.currBoard }),
    shallowEqual
  );

  const [loggedInUser, setLoggedInUser] = useState(
    userService.getLoggedinUser()
  );

  const dispatch = useDispatch();

  const [data, setData] = useState(null);

  ///// useStates /////
  const [filteredBoard, setFilteredBoard] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedList, setSelectedList] = useState({});
  const [newList, setNewList] = useState(false);
  const [listName, setListName] = useState('');
  const [newCard, setNewCard] = useState({});
  const [overlay, setOverlay] = useState(false);
  const [forceRender, setForceRender] = useState(true);

  ////// modal stuff /////
  const [editModal, setEditModal] = useState(false);
  const [memberModal, setMemeberModal] = useState(false);
  const [labelsModal, setLabelsModal] = useState(false);
  const [datesModal, setDatesModal] = useState(false);
  // const [filterModal, setFilterModal] = useState(false);
  // const [starStatus, setStarStatus] = useState(false);
  // const [menuModal, setMenuModal] = useState(false);

  ///// Tom useStates /////
  // const [width, setWidth] = useState('');
  // const [boardTitleInput, setBoardTitleInput] = useState('');
  // const [cover, setCover] = useState(false);

  // const toggleStarring = () => {
  // 	setStarStatus(!starStatus);
  // };
  // const toggleModal = (type) => {
  // 	switch (type) {
  // 		case 'filter':
  // 			setFilterModal(!filterModal);
  // 			setMenuModal(false);
  // 			break;
  // 		case 'menu':
  // 			setMenuModal(!menuModal);
  // 			setFilterModal(false);
  // 			break;
  // 		default:
  // 	}
  // };

  ///// useEffect /////

  useEffect(() => {
    dispatch(loadBoard(boardId));
  }, [boardId]);

  useEffect(() => {
    if (board) {
      setData({ ...board });
    }
  }, [board]);

  const [tempBoard, setTempBoard] = useState({});

  // useEffect(() => {
  //   dispatch(loadBoard(boardId));
  // }, [board]);

  useEffect(() => {
    dispatch(loadBoard(boardId));
  }, [forceRender]);

  useEffect(() => {
    if (!loggedInUser) userService.connectGuestUser();
    dispatch(loadBoard(boardId));
    socket.on('setUpdatedBoard', (board) => {
      dispatch(updateBoard(board));
    });
  }, []);

  // useEffect(() => {}, [board]);

  // useEffect(() => {
  // 	if (board) setBoardTitleInput(board.title);
  // 	if (board) setWidth(board.title.length - 2 + 'ch');
  // }, [board]);

  function handleChange({ target }) {
    const value = target.value;
    setNewCard({ ...newCard, title: value });
  }

  ///// Functions /////

  function filterBoard(ev, filter = null) {
    ev.preventDefault();

    let { name } = filter;
    if (filter.name === '') {
      setForceRender(!forceRender);
    } else {
      name = name.toLowerCase();
      const newFilteredBoard = board;
      // for (var i = 0; i < board.groups.length; i++) {
      // 	for (var j = 0; j < board.groups[i].tasks.length; j++) {
      // 		if (board.groups[i].tasks[j] !== newFilteredBoard.groups[i].tasks[j]) console.log('different');
      // 	}
      // }
      // newFilteredBoard.groups = newFilteredBoard.groups.map((group) =>
      // 	group.tasks.filter((task) => task.title.toLowerCase().includes(name))
      // );
      const filteredGroups = newFilteredBoard.groups.filter((group) =>
        group.title.toLowerCase().includes(name)
      );

      // filteredBoard.groups = filteredGroups.forEach(group);
      newFilteredBoard.groups = filteredGroups;
      setFilteredBoard(newFilteredBoard);
    }
  }

  const editNewCard = (list) => {
    setNewCard({ ...newCard, id: utilService.makeId(), tasksId: [] });
    list.editMode = true;
  };
  const closeAddNewCard = (group) => {
    group.editMode = false;
    setNewCard({});
  };

  const toggleModal = (type) => {
    dispatch(openModal(type));
  };
  // Tom funcs

  // function handleBoardTitleChange({ target }) {
  //   if (!target) return;
  //   console.log(target);
  //   // const field = target.name;
  //   const value = target.value;
  //   setWidth(value.length + 'ch');
  //   setBoardTitleInput(value);
  // }

  // const addCover = (cover) => {
  //   setCover(cover);
  // };

  // const updateBoardTitle = () => {
  //   const updatedBoard = { ...board };
  //   updatedBoard.title = boardTitleInput;
  //   dispatch(updateBoard(updatedBoard));
  //   setForceRender(!forceRender);
  // };
  function getNiceDate() {
    return `${new Date().toDateString()} ${
      new Date().getHours() + ':' + new Date().getMinutes()
    }`;
  }
  const addNewCard = (list) => {
    let listIdx = board.groups.findIndex((group) => group.id === list.id);
    list.tasks.push(newCard);
    console.log('list', list);
    list.tasksIds.push(newCard.id);
    console.log('list.tasksIds', list.tasksIds);
    const updatedBoard = { ...board };
    updatedBoard.groups[listIdx] = list;
    updatedBoard.groups[listIdx].editMode = false;
    let activity = {
      user: loggedInUser,
      msg: `added a card in group: ${list.title}`,
      time: getNiceDate(),
    };
    updatedBoard.activities.push(activity);
    setForceRender(!forceRender);
    dispatch(updateBoard(updatedBoard));
    socket.emit('updateBoard', updatedBoard);
  };

  const openEditModal = (card) => {
    setSelectedCard(card);
    toggleEditModal();
  };

  const openListModal = (group) => {
    setSelectedList(group);
  };

  const closeListModal = (group) => {
    setSelectedList({});
  };

  const closeEditModal = () => {
    setSelectedCard({});
    setEditModal(false);
    toggleEditModal();
  };

  const handleNewList = ({ target }) => {
    const value = target.value;
    setListName(value);
  };

  const addNewGroup = () => {
    const updatedBoard = { ...board };
    const newGroup = {
      id: utilService.makeId(),
      style: {},
      tasks: [],
      tasksIds: [],
      title: listName,
    };
    updatedBoard.groupsOrder.push(newGroup.id);
    updatedBoard.groups.push(newGroup);
    setNewList(false);
    let activity = {
      user: loggedInUser,
      msg: `added a Group in Board:  ${updatedBoard.title}`,
      time: getNiceDate(),
    };
    updatedBoard.activities.push(activity);
    dispatch(updateBoard(updatedBoard));
    socket.emit('updateBoard', updatedBoard);
  };

  const deleteList = async (list) => {
    const updatedBoard = { ...board };
    const groupIdx = updatedBoard.groups.findIndex(
      (group) => group.id === list.id
    );
    updatedBoard.groups.splice(groupIdx, 1);
    updatedBoard.groupsOrder.splice(groupIdx, 1);
    let activity = {
      user: loggedInUser,
      msg: `deleted a Group in Board:  ${updatedBoard.title}`,
      time: getNiceDate(),
    };
    updatedBoard.activities.push(activity);
    setForceRender(!forceRender);
    await dispatch(updateBoard(updatedBoard));
    socket.emit('updateBoard', updatedBoard);
  };

  const editCard = (list, card) => {
    const editedCard = { ...card, title: newCard.title };
    setSelectedCard('copiedTasks', editedCard);
    let listIdx = board.groups.findIndex((group) => group.id === list.id);
    let cardIdx = list.tasks.findIndex((task) => task.id === card.id);
    const updatedBoard = { ...board };
    updatedBoard.groups[listIdx].tasks[cardIdx] = editedCard;
    let activity = {
      user: loggedInUser,
      msg: `edited a Card in Group:  ${list.title}`,
      time: getNiceDate(),
    };
    updatedBoard.activities.push(activity);
    dispatch(updateBoard(updatedBoard));
    socket.emit('updateBoard', updatedBoard);

    closeEditModal(card);
  };

  const toggleEditModal = () => {
    setOverlay(!overlay);
  };

  const copyCard = (list, card) => {
    const updatedBoard = { ...board };
    const copiedCard = { ...card, id: utilService.makeId() };
    let listIdx = updatedBoard.groups.findIndex(
      (group) => group.id === list.id
    );
    updatedBoard.groups[listIdx].tasksIds.push(copiedCard.id);
    updatedBoard.groups[listIdx].tasks.push(copiedCard);
    let activity = {
      user: loggedInUser,
      msg: `copied a Card in Group:  ${list.title}`,
      time: getNiceDate(),
    };
    updatedBoard.activities.push(activity);
    closeEditModal();
    dispatch(updateBoard(updatedBoard));
    socket.emit('updateBoard', updatedBoard);

    setForceRender(!forceRender);
  };

  const copyList = (list) => {
    const updatedBoard = { ...board };
    const copiedList = { ...list, id: utilService.makeId() };
    let copiedTasks = [...copiedList.tasks];
    copiedTasks = copiedTasks.map((task) => {
      return { ...task, id: utilService.makeId() };
    });
    copiedList.tasksIds = copiedTasks.map((task) => task.id);
    copiedList.tasks = copiedTasks;
    updatedBoard.groups.push(copiedList);
    updatedBoard.groupsOrder.push(copiedList.id);
    let activity = {
      user: loggedInUser,
      msg: `copied a Group in Board: ${updatedBoard.title}`,
      time: getNiceDate(),
    };
    updatedBoard.activities.push(activity);
    closeListModal();
    dispatch(updateBoard(updatedBoard));
    socket.emit('updateBoard', updatedBoard);

    setForceRender(!forceRender);
  };

  const deleteCard = (list, card) => {
    const updatedBoard = { ...board };
    let listIdx = updatedBoard.groups.findIndex(
      (group) => group.id === list.id
    );
    let cardIdx = updatedBoard.groups[listIdx].tasks.findIndex(
      (task) => task.id === card.id
    );
    console.log('cardIdx', cardIdx);
    updatedBoard.groups[listIdx].tasks = updatedBoard.groups[
      listIdx
    ].tasks.filter((task) => task.id !== card.id);
    updatedBoard.groups[listIdx].tasksIds.splice(cardIdx, 1);
    let activity = {
      user: loggedInUser,
      msg: `deleted a Card in Group:  ${list.title}`,
      time: getNiceDate(),
    };
    updatedBoard.activities.push(activity);
    closeEditModal();
    setForceRender(!forceRender);
    dispatch(updateBoard(updatedBoard));
    socket.emit('updateBoard', updatedBoard);
  };

  const loadUsers = async () => {
    const users = await userService.getUsers();
    dispatch(setUsers(users));
  };

  const loadUser = () => {
    let user = userService.getLoggedinUser();
    if (!user) user = userService.connectGuestUser();
    setLoggedInUser(user);
  };
  // const [loggedInUser, setLoggedInUser] = useState();
  const { users } = useSelector((state) => ({
    users: state.userModule.users,
  }));

  const [openLabels, setOpenLabels] = useState(false);
  const [listModal, setListModal] = useState(false);

  const onDragEnd = (result) => {
    const { draggableId, type, source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newGroupsOrder = [...data.groupsOrder];
      newGroupsOrder.splice(source.index, 1);
      newGroupsOrder.splice(destination.index, 0, draggableId);
      const newData = {
        ...data,
        groupsOrder: newGroupsOrder,
      };
      setData(newData);
      dispatch(updateBoard(newData));
      socket.emit('updateBoard', newData);

      return;
    }

    const startGroupIdx = data.groups.findIndex(
      (fGroup) => fGroup.id === source.droppableId
    );
    const finishGroupIdx = data.groups.findIndex(
      (fGroup) => fGroup.id === destination.droppableId
    );

    const groupStart = data.groups[startGroupIdx];
    const groupFinish = data.groups[finishGroupIdx];
    if (groupStart === groupFinish) {
      const newTaskIds = [...groupStart.tasksIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newGroup = { ...groupStart, tasksIds: newTaskIds };
      const newGroups = [...data.groups];
      newGroups[startGroupIdx] = newGroup;
      const newData = {
        ...data,
        groups: newGroups,
      };
      setData(newData);
      dispatch(updateBoard(newData));
      socket.emit('updateBoard', newData);

      return;
    } else {
      const startTaskIds = [...groupStart.tasksIds];
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...groupStart,
        tasksIds: startTaskIds,
      };
      newStart.tasks.tasksIds = startTaskIds;

      const startTaskIdx = newStart.tasks.findIndex(
        (task) => task.id === draggableId
      );
      const startTask = newStart.tasks.splice(startTaskIdx, 1);
      const finishTaskIds = [...groupFinish.tasksIds];
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...groupFinish,
        tasksIds: finishTaskIds,
      };
      newFinish.tasks.tasksIds = finishTaskIds;

      // const endTaskIdx = newStart.findIndex(
      //   (task) => task.id === draggableId
      // );
      newFinish.tasks.splice(destination.index, 0, ...startTask);

      const newGroups = [...data.groups];
      newGroups[startGroupIdx] = newStart;
      newGroups[finishGroupIdx] = newFinish;
      const newData = {
        ...data,
        groups: newGroups,
      };
      setData(newData);
      dispatch(updateBoard(newData));
      socket.emit('updateBoard', newData);
    }
    // const group = data.groups[source.drop]
  };
  return data ? (
    <section className='flex-column h100'>
      {console.log('board', board)}
      <div
        className={overlay ? 'overlay' : 'overlay hidden'}
        onClick={closeEditModal}
      ></div>
      {board ? (
        <BoardHeader
          // Header
          board={board}
          setForceRender={setForceRender}
          // Filter
          filterBoard={filterBoard}
        />
      ) : null}
      <div
        className='board flex'
        onClick={(ev) => {
          toggleModal('');
          ev.stopPropagation();
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId='all-columns'
            direction='horizontal'
            type='column'
          >
            {(provided) => (
              <div
                className='flex'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data
                  ? data.groupsOrder.map((groupId, index) => {
                      const groupInx = data.groups.findIndex(
                        (sGroup) => sGroup.id === groupId
                      );
                      const group = data.groups[groupInx];
                      const tasks = [];
                      for (let i = 0; i < data.groups.length; i++) {
                        for (let j = 0; j < data.groups[i].tasks.length; j++) {
                          tasks.push(data.groups[i].tasks[j]);
                        }
                      }
                      return (
                        <Group
                          // style={{ zIndex: group.style.zIndex }}
                          key={group?.id}
                          group={group}
                          index={index}
                          tasks={tasks}
                          openListModal={openListModal}
                          selectedList={selectedList}
                          closeListModal={closeListModal}
                          copyList={copyList}
                          editNewCard={editNewCard}
                          closeAddNewCard={closeAddNewCard}
                          deleteList={deleteList}
                          selectedCard={selectedCard}
                          openLabels={openLabels}
                          setOpenLabels={setOpenLabels}
                          openEditModal={openEditModal}
                          cardEdit={cardEdit}
                          handleChange={handleChange}
                          editCard={editCard}
                          closeEditModal={closeEditModal}
                          copyCard={copyCard}
                          deleteCard={deleteCard}
                          addNewCard={addNewCard}
                          board={board}
                          socket={socket}
                        />
                      );
                    })
                  : null}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {!newList ? (
            <div className='add-list' onClick={() => setNewList(true)}>
              <img src={plusWhite} alt='+' /> Add new group
            </div>
          ) : (
            <div className='add-list-options flex-column'>
              <input
                type='text'
                name='new-list-name'
                placeholder='Enter list title'
                onChange={handleNewList}
              />
              <div className='add-list-edit flex'>
                <div className='add-list-btn' onClick={addNewGroup}>
                  Add List
                </div>
                <div className='add-list-btn' onClick={() => setNewList(false)}>
                  X
                </div>
              </div>
            </div>
          )}
          <Route
            component={CardDetails}
            path={`/board/:boardId/:cardId/:listId`}
          />
        </DragDropContext>
      </div>
    </section>
  ) : (
    <div>Loading...</div>
  );
};
