import React, { useEffect, useState } from 'react';
import { CardDetails } from './CardDetails.jsx';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { BoardService } from '../services/board.service.js';

export const Board = () => {
  const [board, setBoard] = useState({});

  useEffect(async () => {
    console.log('hello world');
    setBoard(await BoardService.getBoards());
  }, []);
  return (
    <div>
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
                          <Link to={`/board/${card.id}`}> {card.title}</Link>
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
        <Route component={CardDetails} path='/board/:cardId' />
      </Switch>
    </div>
  );
};
