import React, { useEffect, useState } from 'react';
import { CardDetails } from './CardDetails.jsx';
import { Route, Switch } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { loadBoard, addCard, updateBoard } from '../store/board.action.js';
import { BoardFilter } from '../cmps/Boardfilter.jsx';
import { utilService } from '../services/util.service.js';
import addUser from '../assets/imgs/add-user.png';
import { over } from 'lodash';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initialData.js';
import Group from '../cmps/Group.jsx';

export const Board = () => {
  const { boardId } = useParams();
  const { board } = useSelector(
    (state) => ({ board: state.boardModule.currBoard }),
    shallowEqual
  );
  const dispatch = useDispatch();

  ///// useStates /////
  const [filteredBoard, setFilteredBoard] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
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
  const [filterModal, setFilterModal] = useState(false);
  const [starStatus, setStarStatus] = useState(false);

  const [data, setData] = useState({ tasks: {}, columns: {}, columnOrder: [] });
  const dnd = { tasks: {}, columns: {}, columnOrder: [] };

  ///// Tom useStates /////

  const [boardTitleInput, setBoardTitleInput] = useState('');

  const toggleStarring = () => {
    setStarStatus(!starStatus);
  };
  const toggleModal = (type) => {
    type === 'filter' && setFilterModal(!filterModal);
  };

  ///// useEffect /////

  useEffect(() => {
    console.log('nadav');
  }, [filteredBoard]);

  useEffect(() => {
    dispatch(loadBoard(boardId));
  }, []);

  useEffect(() => {
    if (board) {
      const boardData = [...board.groups];
      for (let i = 0; i < boardData.length; i++) {
        dnd.columns[boardData[i].id] = boardData[i];
        dnd.columns[boardData[i].id]['taskIds'] = [];
        for (let j = 0; j < boardData[i].tasks.length; j++) {
          dnd.columns[boardData[i].id]['taskIds'].push(
            boardData[i].tasks[j].id
          );
        }
      }
      for (let k = 0; k < boardData.length; k++) {
        for (let h = 0; h < boardData[k].tasks.length; h++) {
          dnd.tasks[boardData[k].tasks[h].id] = boardData[k].tasks[h];
        }
      }
      for (const col in dnd.columns) {
        dnd.columnOrder.push(col);
      }
    }
    setData(dnd);
  }, [board]);

  useEffect(() => {
    dispatch(loadBoard(boardId));
  }, [forceRender]);

  useEffect(() => {}, [board]);
  function handleChange({ target }) {
    const value = target.value;
    setNewCard({ ...newCard, title: value });
  }

  ///// Functions /////

  function FilterBoard(ev, filter = null) {
    ev.preventDefault();

    let { name } = filter;
    if (filter.name === '') {
      setForceRender(!forceRender);
    } else {
      name = name.toLowerCase();
      const newFilteredBoard = board;
      const filteredGroups = newFilteredBoard.groups.filter((group) =>
        group.title.toLowerCase().includes(name)
      );
      // const filteredTasks = filteredBoard.groups.forEach((group) =>
      // 	group.tasks.filter((task) => task.title.toLowerCase().includes(name.toLowerCase()))
      // );
      // filteredBoard.groups = filteredGroups.forEach(group);
      newFilteredBoard.groups = filteredGroups;
      setFilteredBoard(newFilteredBoard);
    }
  }

  const editNewCard = (list) => {
    setNewCard({ ...newCard, id: utilService.makeId() });
    list.editMode = true;
  };

  function handleBoardTitleChange({ target }) {
    if (!target) return;
    console.log(target);
    // const field = target.name;
    const value = target.value;
    setBoardTitleInput(value);
  }

  const addNewCard = (list) => {
    let listIdx = board.groups.findIndex((group) => group.id === list.id);
    list.tasks.push(newCard);
    const updatedBoard = { ...board };
    updatedBoard.groups[listIdx] = list;
    updatedBoard.groups[listIdx].editMode = false;
    dispatch(updateBoard(updatedBoard));
  };

  const openEditModal = (card) => {
    toggleEditModal();
    setSelectedCard(card);
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
      title: listName,
    };
    updatedBoard.groups.push(newGroup);
    dispatch(updateBoard(updatedBoard));
    setNewList(false);
  };

  const deleteList = (list) => {
    const updatedBoard = { ...board };
    updatedBoard.groups = updatedBoard.groups.filter(
      (group) => group.id !== list.id
    );
    dispatch(updateBoard(updatedBoard));
    setForceRender(!forceRender);
  };
  const updateBoardTitle = () => {
    const updatedBoard = { ...board };
    updatedBoard.title = boardTitleInput;
    dispatch(updateBoard(updatedBoard));
    setForceRender(!forceRender);
  };

  const editCard = (list, card) => {
    const editedCard = { ...card, title: newCard.title };
    setSelectedCard(editedCard);
    let listIdx = board.groups.findIndex((group) => group.id === list.id);
    let cardIdx = list.tasks.findIndex((task) => task.id === card.id);
    const updatedBoard = { ...board };
    updatedBoard.groups[listIdx].tasks[cardIdx] = editedCard;
    dispatch(updateBoard(updatedBoard));
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
    updatedBoard.groups[listIdx].tasks.push(copiedCard);
    closeEditModal();
    dispatch(updateBoard(updatedBoard));
    setForceRender(!forceRender);
  };

  const deleteCard = (list, card) => {
    const updatedBoard = { ...board };
    let listIdx = updatedBoard.groups.findIndex(
      (group) => group.id === list.id
    );
    updatedBoard.groups[listIdx].tasks = updatedBoard.groups[
      listIdx
    ].tasks.filter((task) => task.id !== card.id);
    closeEditModal();
    dispatch(updateBoard(updatedBoard));
    setForceRender(!forceRender);
  };

  // const initialData = {
  //   tasks: {
  //     'task-1': { id: 'task-1', content: 'take out the garbage' },
  //     'task-2': { id: 'task-2', content: 'watch my favorite' },
  //     'task-3': { id: 'task-3', content: 'charge my phone' },
  //   },
  //   columns: {
  //     'column-1': {
  //       id: 'column-1',
  //       title: 'todo',
  //       taskIds: ['task-1', 'task-2', 'task-3'],
  //     },
  //     'column-2': {
  //       id: 'column-2',
  //       title: 'progress',
  //       taskIds: [],
  //     },
  //     'column-3': {
  //       id: 'column-3',
  //       title: 'done',
  //       taskIds: [],
  //     },
  //   },
  //   columnOrder: ['column-1', 'column-2', 'column-3'],
  // };

  const onDragEnd = (res) => {
    const { destination, source, draggableId, type } = res;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = [...data.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newData = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newData);
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const column = data.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...column, taskIds: newTaskIds };
      const newData = {
        ...data,
        columns: { ...data.columns, [newColumn.id]: newColumn },
      };
      setData(newData);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newData);
  };

  return (
    <section>
      <div
        className={overlay ? 'overlay' : 'overlay hidden'}
        onClick={closeEditModal}
      ></div>
      {board ? (
        <div>
          <header className='board-header'>
            <div className='header-left-container flex-center'>
              <h1>{board.title}</h1>
              <div className='board-header-div star-container flex-center'>
                <span
                  onClick={() => {
                    toggleStarring();
                  }}
                  className={starStatus ? 'starOn' : 'star'}
                >
                  &#9734;
                </span>
              </div>
            </div>
            <div className='users-div flex-center'>
              <div className='member-icons'>
                <div className='member-icon'>OK</div>
                <div className='member-icon'>NI</div>
                <div className='member-icon'>TR</div>
              </div>
              <div className='board-header-div invite-btn flex-center'>
                <img className='add-user-img' src={addUser} alt='' />
                <span>Invite</span>
              </div>
            </div>
            <div className='actions-div flex'>
              <div className='board-header-div dashboard flex-center'>
                <span>Dashboard</span>
              </div>
              <div className='board-header-div filter-div flex-center'>
                <span
                  onClick={() => {
                    toggleModal('filter');
                  }}
                >
                  Filter
                </span>
              </div>
              <div className='menu board-header-div flex-center'>
                <span>...Show menu</span>
              </div>
            </div>
          </header>
          <div className='board flex pink'>
            {data ? (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                  droppableId='all-columns'
                  direction='horizontal'
                  type='column'
                >
                  {(provided) => (
                    <div
                      className='Container flex'
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {data.columnOrder.map((columnId, index) => {
                        const column = data.columns[columnId];
                        const tasks = column.taskIds.map(
                          (taskId) => data.tasks[taskId]
                        );
                        return (
                          <Group
                            key={column.id}
                            column={column}
                            tasks={tasks}
                            index={index}
                            deleteList={deleteList}
                            editNewCard={editNewCard}
                            addNewCard={addNewCard}
                            handleChange={handleChange}
                            boardId={boardId}
                            openEditModal={openEditModal}
                            closeEditModal={closeEditModal}
                            selectedCard={selectedCard}
                            editCard={editCard}
                            copyCard={copyCard}
                            deleteCard={deleteCard}
                          />
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : null}
            {!newList ? (
              <div className='add-list flex' onClick={() => setNewList(true)}>
                add new group
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
                  <div
                    className='add-list-btn'
                    onClick={() => setNewList(false)}
                  >
                    X
                  </div>
                </div>
              </div>
            )}
          </div>
          {filterModal && <BoardFilter FilterBoard={FilterBoard} />}
          <Route
            component={CardDetails}
            path={`/board/:boardId/:cardId/:listId`}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div></div>
    </section>
  );
};
