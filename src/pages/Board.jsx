// React
import React, { useEffect, useState } from 'react';
import { CardDetails } from './CardDetails.jsx';
import { Route } from 'react-router';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// import { socket } from '../RootCmp.jsx';
// import { io } from 'socket.io-client';
// Redux
import { loadBoard, updateBoard, openModal } from '../store/board.action.js';

// Cmps
import { BoardHeader } from '../cmps/boardCmps/BoardHeader.jsx';
import Group from '../cmps/Group.jsx';

// Utils
import { utilService } from '../services/util.service.js';

// Libs
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// Images
import cardEdit from '../assets/imgs/card-edit.svg';
import plusWhite from '../assets/imgs/plus-white.svg';
import { socketService } from '../services/socket.service.js';

////// DND IMPORTS ///////

////////////////////////////////////////////////////

export const Board = () => {
  const { boardId } = useParams();
  const { board } = useSelector(
    (state) => ({ board: state.boardModule.currBoard }),
    shallowEqual
  );

  const { loggedInUser } = useSelector((state) => ({
    loggedInUser: state.userModule.loggedInUser,
  }));

  const dispatch = useDispatch();

  ///// useStates /////

  const [data, setData] = useState(null);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedList, setSelectedList] = useState({});
  const [newList, setNewList] = useState(false);
  const [listName, setListName] = useState('');
  const [newCard, setNewCard] = useState({});
  const [overlay, setOverlay] = useState(false);
  const [forceRender, setForceRender] = useState(true);
  const [openLabels, setOpenLabels] = useState(false);

  // const [filteredBoard, setFilteredBoard] = useState({});

  ///// useEffect /////

  useEffect(() => {
    dispatch(loadBoard(boardId));
    socketService.setup();
    socketService.emit('socket-by-boardId', boardId);
    console.log('sent emit');
    socketService.on('setUpdatedBoard', (board) => {
      dispatch(updateBoard(board));
    });
  }, [boardId]);

  useEffect(() => {
    if (board) {
      setData({ ...board });
    } else setForceRender(!forceRender);
  }, [board]);

  useEffect(() => {
    dispatch(loadBoard(boardId));
  }, [forceRender]);

  useEffect(() => {
    dispatch(loadBoard(boardId));
  }, []);

  ///// Functions /////

  // function filterBoard(ev, filter = null) {
  //   ev.preventDefault();

  //   let { name } = filter;
  //   if (filter.name === '') {
  //     setForceRender(!forceRender);
  //   } else {
  //     name = name.toLowerCase();
  //     const newFilteredBoard = board;
  //     // for (var i = 0; i < board.groups.length; i++) {
  //     // 	for (var j = 0; j < board.groups[i].tasks.length; j++) {
  //     // 		if (board.groups[i].tasks[j] !== newFilteredBoard.groups[i].tasks[j]) console.log('different');
  //     // 	}
  //     // }
  //     // newFilteredBoard.groups = newFilteredBoard.groups.map((group) =>
  //     // 	group.tasks.filter((task) => task.title.toLowerCase().includes(name))
  //     // );
  //     const filteredGroups = newFilteredBoard.groups.filter((group) =>
  //       group.title.toLowerCase().includes(name)
  //     );

  //     // filteredBoard.groups = filteredGroups.forEach(group);
  //     newFilteredBoard.groups = filteredGroups;
  //     setFilteredBoard(newFilteredBoard);
  //   }
  // }

  function handleChange({ target }) {
    const value = target.value;
    setNewCard({ ...newCard, title: value });
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

  const addNewCard = (list) => {
    let listIdx = board.groups.findIndex((group) => group.id === list.id);
    list.tasks.push(newCard);
    list.tasksIds.push(newCard.id);
    const updatedBoard = { ...board };
    updatedBoard.groups[listIdx] = list;
    updatedBoard.groups[listIdx].editMode = false;
    let activity = {
      user: loggedInUser,
      msg: `Added a card in group: ${list.title}`,
      time: utilService.getNiceDate(),
    };
    updatedBoard.activities.unshift(activity);
    setForceRender(!forceRender);
    dispatch(updateBoard(updatedBoard));
    socketService.emit('updateBoard', updatedBoard);
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
      msg: `Added a Group in Board:  ${updatedBoard.title}`,
      time: utilService.getNiceDate(),
    };
    updatedBoard.activities.unshift(activity);
    dispatch(updateBoard(updatedBoard));
    socketService.emit('updateBoard', updatedBoard);
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
      msg: `Deleted a Group in Board:  ${updatedBoard.title}`,
      time: utilService.getNiceDate(),
    };
    updatedBoard.activities.unshift(activity);
    setForceRender(!forceRender);
    await dispatch(updateBoard(updatedBoard));
    socketService.emit('updateBoard', updatedBoard);
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
      msg: `Edited a Card in Group:  ${list.title}`,
      time: utilService.getNiceDate(),
    };
    updatedBoard.activities.unshift(activity);
    dispatch(updateBoard(updatedBoard));
    socketService.emit('updateBoard', updatedBoard);

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
      msg: `Copied a Card in Group:  ${list.title}`,
      time: utilService.getNiceDate(),
    };
    updatedBoard.activities.unshift(activity);
    closeEditModal();
    dispatch(updateBoard(updatedBoard));
    socketService.emit('updateBoard', updatedBoard);

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
      msg: `Copied a Group in Board: ${updatedBoard.title}`,
      time: utilService.getNiceDate(),
    };
    updatedBoard.activities.unshift(activity);
    closeListModal();
    dispatch(updateBoard(updatedBoard));
    socketService.emit('updateBoard', updatedBoard);

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
    updatedBoard.groups[listIdx].tasks = updatedBoard.groups[
      listIdx
    ].tasks.filter((task) => task.id !== card.id);
    updatedBoard.groups[listIdx].tasksIds.splice(cardIdx, 1);
    let activity = {
      user: loggedInUser,
      msg: `Deleted a Card in Group:  ${list.title}`,
      time: utilService.getNiceDate(),
    };
    updatedBoard.activities.unshift(activity);
    closeEditModal();
    setForceRender(!forceRender);
    dispatch(updateBoard(updatedBoard));
    socketService.emit('updateBoard', updatedBoard);
  };

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
      socketService.emit('updateBoard', newData);

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
      socketService.emit('updateBoard', newData);

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
      socketService.emit('updateBoard', newData);
    }
  };
  return data ? (
    <section className='flex-column h100'>
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
          // filterBoard={filterBoard}
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
                <div className='add-list-btn pointer' onClick={addNewGroup}>
                  Add List
                </div>
                <div
                  className='add-list-btn pointer'
                  onClick={() => setNewList(false)}
                >
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
