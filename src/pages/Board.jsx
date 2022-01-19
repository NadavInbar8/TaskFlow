import React, { useEffect, useState, Component } from 'react';
import { CardDetails } from './CardDetails.jsx';
import { Route, Switch } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { boardService } from '../services/board.service.js';
import { loadBoard } from '../store/board.action.js';
import { connect } from 'react-redux';
import something from '../assets/imgs/something.svg';

export class _Board extends Component {
  // { boards, currBoard, loadBoard }

  state = {
    board: {},
  };

  componentDidMount() {
    const { boardId } = this.props.match.params;
    console.log(boardId);
    this.props.loadBoard(boardId).then(() => {
      this.setState({ board: this.props.currBoard });
    });
  }

  // componentDidUpdate() {
  // }

  render() {
    const { board } = this.state;
    return (
      <section>
        {board ? (
          <div>
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
                                  to={`/board/${board._id}/${card.id}/${list.id}`}
                                >
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
            <img src={something} alt='' />
            <Switch>
              <Route
                component={() => <CardDetails board={board} />}
                path={`/board/:boardId/:cardId/:listId`}
              />
            </Switch>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </section>
    );
  }
}

function mapStateToProps({ boardModule }) {
  return {
    boards: boardModule.boards,
    currBoard: boardModule.currBoard,
  };
}

const mapDispatchToProps = {
  loadBoard,
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
