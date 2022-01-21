import React, { useEffect, useState } from 'react';
import { CardDetails } from './CardDetails.jsx';
import { Route, Switch } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { loadBoard, addCard, updateBoard } from '../store/board.action.js';
import { BoardFilter } from '../cmps/Boardfilter.jsx';
import { utilService } from '../services/util.service.js';
import addUser from '../assets/imgs/add-user.png';

export const Board = () => {
  const { boardId } = useParams();
  const { board } = useSelector(
    (state) => ({ board: state.boardModule.currBoard }),
    shallowEqual
  );
  const [filteredBoard, setBoard] = useState({});
  const dispatch = useDispatch();

  ////// modal stuff /////
  const [editModal, setEditModal] = useState(false);
  const [memberModal, setMemeberModal] = useState(false);
  const [labelsModal, setLabelsModal] = useState(false);
  const [datesModal, setDatesModal] = useState(false);
  let [filterModal, setFilterModal] = useState(false);
  let [starStatus, setStarStatus] = useState(false);

  useEffect(() => {
    console.log('nadav');
  }, [filteredBoard]);

  function setFilteredBoard(ev, filter = null) {
    ev.preventDefault();
    // console.log('ev', ev);
    console.log('filter', filter);
    console.log('board', board);
    let { name } = filter;
    name = name.toLowerCase();
    console.log(name);
    const newFilteredBoard = board;
    const filteredGroups = newFilteredBoard.groups.filter((group) =>
      group.title.toLowerCase().includes(name)
    );
    // const filteredTasks = filteredBoard.groups.forEach((group) =>
    // 	group.tasks.filter((task) => task.title.toLowerCase().includes(name.toLowerCase()))
    // );
    // filteredBoard.groups = filteredGroups.forEach(group);
    newFilteredBoard.groups = filteredGroups;
    setBoard(newFilteredBoard);
  }

  const [newCard, setNewCard] = useState({
    id: 'yosi',
    description: 'hi',
    comments: [],
    title: '',
    memebers: [],
    label: [],
    date: '',
    attachedLinks: [],
    cover: '',
    editMode: false,
  });

  // add the filteredboard to the state which is the board from the store
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    dispatch(loadBoard(boardId));
  }, []);

  function handleChange({ target }) {
    // const field = target.name;
    const value = target.value;
    setNewCard({ ...newCard, title: value });
  }

  const editNewCard = (list) => {
    list.editMode = true;
    setEdit(true);
    setNewCard({ id: utilService.makeId() });
  };

  const editCard = (card) => {
    card.editMode = true;
  };

  const addNewCard = (list) => {
    let listIdx = board.groups.findIndex((group) => group.id === list.id);
    list.tasks.push(newCard);
    const updatedBoard = { ...board };
    updatedBoard.groups[listIdx] = list;
    updatedBoard.groups[listIdx].editMode = false;
    setEdit(false);
    dispatch(updateBoard(updatedBoard));
  };

  const openEditModal = () => {
    console.log('hello world');
    setEditModal(true);
  };
  const closeEditModal = () => {
    setEditModal(false);
  };

  const toggleModal = (type) => {
    type === 'filter' && setFilterModal((filterModal = !filterModal));
  };

  const toggleStarring = () => {
    setStarStatus((starStatus = !starStatus));
  };

  return (
    <section>
      {console.log(board)}
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
          <div className='board flex'>
            {board.groups
              ? board.groups.map((list) => {
                  return (
                    <div key={list.id} className='board-list flex-column'>
                      <h3>{list.title}</h3>
                      <ul>
                        {list.tasks.map((card) => {
                          return (
                            <li key={card.id} className='board-card'>
                              <Link
                                to={`/board/${boardId}/${card.id}/${list.id}`}
                              >
                                {card.title}
                              </Link>{' '}
                              <button onClick={openEditModal}>edit</button>
                              {card.editMode ? (
                                <div className='edit-modal'>
                                  Edit Modal has opened
                                  <button onClick={closeEditModal}>
                                    Close edit Modal
                                  </button>
                                </div>
                              ) : null}
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
          </div>
          {filterModal && <BoardFilter setFilteredBoard={setFilteredBoard} />}
          <Route
            component={CardDetails}
            path={`/board/:boardId/:cardId/:listId`}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
};
