import React, { useEffect, useState } from 'react';
import { CardDetails } from './CardDetails.jsx';
import { Route, Switch } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { loadBoard, addCard, updateBoard } from '../store/board.action.js';
import { BoardFilter } from '../cmps/Boardfilter.jsx';
import { utilService } from '../services/util.service.js';

export const Board = () => {
  const { boardId } = useParams();
  const { board } = useSelector(
    (state) => ({ board: state.boardModule.currBoard }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const [newCard, setNewCard] = useState({
    id: '',
    description: 'hi',
    comments: [],
    title: '',
    memebers: [],
    label: [],
    date: '',
    attachedLinks: [],
    cover: '',
  });

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
    console.log('hey there');
    console.log(list);
    list.editMode = true;
    setEdit(true);
    // dispatch(addCard());
  };

  const addNewCard = (list) => {
    let listIdx = board.groups.findIndex((group) => group.id === list.id);
    setNewCard({ ...newCard, id: utilService.makeId() });
    list.tasks.push(newCard);
    const updatedBoard = { ...board };
    updatedBoard.groups[listIdx] = list;
    updatedBoard.groups[listIdx].editMode = false;
    setEdit(false);
    console.log(updatedBoard);
    dispatch(updateBoard(updatedBoard));
  };

  const openEditModal = () => {
    console.log('hello world');
  };

  return (
    <section>
      {board ? (
        <div>
          {console.log(board)}
          <h1>{board.title}</h1>
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
          <BoardFilter />
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

// function mapStateToProps({ boardModule }) {
//   return {
//     boards: boardModule.boards,
//   };
// }
// const mapDispatchToProps = {
//   // loadBoards,
// };

// export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board);

// function mapStateToProps({ toyModule, userModule }) {
// 	return {
// 	  toys: toyModule.toys,
// 	  filterBy: toyModule.filterBy,
// 	  user: userModule.loggedInUser,
// 	  isModalShown: toyModule.isModalShown,
// 	};
//   }

//   const mapDispatchToProps = {
// 	setToys,
// 	removeToy,
// 	setFilterBy,
//   };

//   export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp);
