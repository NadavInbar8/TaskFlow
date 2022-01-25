// React
import React, { useEffect, useState } from 'react';
import { CardDetails } from './CardDetails.jsx';
import { Route, Switch } from 'react-router';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// Redux
import { loadBoard, addCard, updateBoard } from '../store/board.action.js';

// Cmps
import { BoardHeader } from '../cmps/boardCmps/BoardHeader.jsx';
import Group from '../cmps/Group.jsx';

// Utils
import { utilService } from '../services/util.service.js';

// Services
import addUser from '../assets/imgs/add-user.png';

// Libs
import { over } from 'lodash';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initialData.js';

// Images
import filterSvg from '../assets/imgs/filter-svgs/filter.svg';
import attachment from '../assets/imgs/card-attach.svg';
import cardChecklist from '../assets/imgs/card-checklist.svg';
import dueDate from '../assets/imgs/card-due.svg';
import description from '../assets/imgs/card-desc.svg';
import cardEdit from '../assets/imgs/card-edit.svg';

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
  // const [filterModal, setFilterModal] = useState(false);
  // const [starStatus, setStarStatus] = useState(false);
  // const [menuModal, setMenuModal] = useState(false);

  const [data, setData] = useState({ tasks: {}, columns: {}, columnOrder: [] });
  const dnd = { tasks: {}, columns: {}, columnOrder: [] };

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

  useEffect(() => {}, [filteredBoard]);

  // useEffect(() => {
  // 	dispatch(loadBoard(boardId));
  // 	if (board) setBoardTitleInput(board.title);
  // }, []);

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
    setNewCard({ ...newCard, id: utilService.makeId() });
    list.editMode = true;
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

  //   const overlayStyle = { 'z-index': 100 };
  const [openLabels, setOpenLabels] = useState(false);
  return (
    <section>
      <div
        className={overlay ? 'overlay' : 'overlay hidden'}
        onClick={closeEditModal}
      ></div>
      {board ? (
        <div>
          {/* <BoardHeader
						// Header
						board={board}
						setForceRender={setForceRender}
						// Filter
						filterBoard={filterBoard}
					/> */}
          <div className='board flex'>
            {board.groups
              ? board.groups.map((list) => {
                  return (
                    <div key={list.id} className='board-list flex-column'>
                      <h3>{list.title}</h3>
                      <button onClick={() => deleteList(list)}>
                        delete list
                      </button>
                      <ul>
                        {list.tasks.map((card) => {
                          console.log('card', card);
                          return selectedCard.id !== card.id ? (
                            <li
                              key={card.id}
                              className='board-card flex-column'
                            >
                              {card.cover ? (
                                <div
                                  className='card-cover'
                                  style={
                                    card.cover.type == 'color'
                                      ? { backgroundColor: card.cover.cover }
                                      : null
                                  }
                                >
                                  {card.cover.type == 'img' ? (
                                    <img
                                      src={card.cover.cover}
                                      className='card-img-cover'
                                    />
                                  ) : null}
                                </div>
                              ) : null}
                              <div className='board-card-details'>
                                {card.labels ? (
                                  <div
                                    className={
                                      openLabels
                                        ? 'card-labels-open flex'
                                        : 'card-labels flex'
                                    }
                                  >
                                    <ul>
                                      {card.labels.map((label, idx) => {
                                        return (
                                          <li
                                            key={idx}
                                            className='label'
                                            onClick={() =>
                                              setOpenLabels(!openLabels)
                                            }
                                            style={{
                                              backgroundColor: label.color,
                                            }}
                                          >
                                            {openLabels
                                              ? `${label.name}`
                                              : null}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                ) : null}
                                <div className='card-title flex'>
                                  <Link
                                    to={`/board/${boardId}/${card.id}/${list.id}`}
                                  >
                                    {card.title}
                                  </Link>
                                  <div
                                    className='board-card-edit-btn '
                                    onClick={() => openEditModal(card)}
                                  >
                                    <img src={cardEdit} alt='edit' />
                                  </div>
                                </div>
                                <div className='card-options flex'>
                                  {card.date ? (
                                    <div
                                      className='card-date flex'
                                      style={
                                        !card.date.overDue
                                          ? { backgroundColor: '#61BD4F' }
                                          : { backgroundColor: '#EB5A46' }
                                      }
                                    >
                                      <img src={dueDate} />
                                      {card.date.date}
                                    </div>
                                  ) : null}
                                  {card.description ? (
                                    <img
                                      className='board-card-description'
                                      src={description}
                                      title='this card has description'
                                    />
                                  ) : null}
                                  {card.checkLists ? (
                                    <div className='board-card-checklist'>
                                      {console.log(card.checkLists)}
                                      {card.checkLists.map((checkList, idx) => {
                                        let checkListCounter = 0;

                                        checkList.items.forEach(
                                          (checkListItem) => {
                                            if (checkListItem.isDone) {
                                              checkListCounter++;
                                            }
                                          }
                                        );
                                        return (
                                          <span
                                            className=' flex-center'
                                            key={idx}
                                          >
                                            {checkListCounter}/
                                            {checkList.items.length}
                                            <img src={cardChecklist} />
                                          </span>
                                        );
                                      })}
                                    </div>
                                  ) : null}
                                  {card.attachments
                                    ? card.attachments.map((attachmentX) => {
                                        return (
                                          <div className='board-card-attachment flex-center'>
                                            {card.attachments.length}
                                            <img src={attachment} />
                                          </div>
                                        );
                                      })
                                    : null}
                                </div>
                              </div>
                            </li>
                          ) : (
                            <li key={card.id} className='board-card overlaySee'>
                              <input
                                type='text'
                                defaultValue={card.title}
                                onChange={handleChange}
                              />
                              <div
                                className='add-card'
                                onClick={() => editCard(list, card)}
                              >
                                save
                              </div>
                              <div className='edit-modal'>
                                <ul>
                                  <li>
                                    <Link
                                      onClick={closeEditModal}
                                      to={`/board/${boardId}/${card.id}/${list.id}`}
                                    >
                                      Open Card
                                    </Link>
                                  </li>
                                  <li>Edit Labels</li>
                                  <li>Change Members</li>
                                  <li>Change Cover</li>
                                  <li onClick={() => copyCard(list, card)}>
                                    Copy
                                  </li>
                                  <li>Edit Dates</li>
                                  <li onClick={() => deleteCard(list, card)}>
                                    Archive
                                  </li>
                                </ul>
                              </div>
                            </li>
                          );
                        })}
                        {list.editMode ? (
                          <>
                            <input
                              type='text'
                              name='newCard'
                              onChange={handleChange}
                              //   onBlur={updateCard}
                            />
                            <button onClick={() => addNewCard(list)}>
                              add
                            </button>
                          </>
                        ) : (
                          <div
                            className='add-card'
                            onClick={() => editNewCard(list)}
                          >
                            + add new card
                          </div>
                        )}
                      </ul>
                    </div>
                  );
                })
              : null}
            {/* {data ? (
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
            ) : null} */}
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
