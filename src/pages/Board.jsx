import React, { useEffect, useState } from 'react';
import { CardDetails } from './CardDetails.jsx';
import { Route, Switch } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { boardService } from '../services/board.service.js';
import { connect } from 'react-redux';

export const _Board = () => {
  const [board, setBoard] = useState({});
  const { boardId } = useParams();

  useEffect(async () => {
    console.log('hello world');
    setBoard(await boardService.getById(boardId));
  }, []);

  return (
    <section>
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
                          <Link to={`/board/${boardId}/${card.id}/${list.id}`}>
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

function mapStateToProps({ boardModule }) {
  return {
    boards: boardModule.boards,
  };
}

const mapDispatchToProps = {
  // loadBoards,
};

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board);

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
