import React, { useEffect, useState } from 'react';
import { CardDetails } from './CardDetails.jsx';
import { Route, Switch } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { boardService } from '../services/board.service.js';

export const Board = () => {
  const [board, setBoard] = useState({});
  const { boardId } = useParams();
  console.log(boardId);

  useEffect(async () => {
    console.log('hello world');
    setBoard(await boardService.getById(boardId));
  }, []);

  return (
    <section>
      <h1>{board.title}</h1>
      {console.log(board)}
      <div className='board flex'>
        {board.groups
          ? board.groups.map((list) => {
              return (
                <div key={list.id} className='board-list'>
                  <h3>{list.title}</h3>
                  <ul>
                    {list.tasks.map((card) => {
                      return (
                        <li key={card.id} className='board-card'>
                          <Link to={`/board/${boardId}/${card.id}/${list.id}`}>
                            {' '}
                            {card.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          : null}
      </div>
      <Switch>
        <Route
          component={() => <CardDetails board={board} />}
          path={`/board/:boardId/:cardId/:listId`}
        />
      </Switch>
    </section>
  );
};

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
