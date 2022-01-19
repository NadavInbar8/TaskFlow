import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadBoards } from '../store/board.action.js';

import boardPreview from '../assets/imgs/boardPreview.jpg';
import { Link } from 'react-router-dom';
import usersvg from '../assets/imgs/usersvg.svg';

const _WorkSpace = ({ loadBoards, boards }) => {
  const [stateBoards, setBoards] = useState(loadBoards);
  useEffect(() => {
    setBoards(boards);
  }, [stateBoards]);

  return (
    <div className='work-space'>
      <div className='nav'>
        <ul>
          <li>Boards</li>
          <li>Templates</li>
          <li>Home</li>
          <li>
            work-space <button>+</button>
          </li>
        </ul>

        <ul>
          <li>Boards</li>
          <li>hightlights</li>
          <li>WorkSpace table</li>
          <li>Members</li>
          <li>Setting</li>
        </ul>
      </div>

      <div className='workspaces-boards'>
        <div className='boards'>
          <div className='headline'>
            <img className='usersvg' src={usersvg} alt='' />
            <h1 className='headling'> Workspaces boards</h1>
          </div>
          <div className='boards-container'>
            {stateBoards.length ? (
              stateBoards.map((board) => {
                return (
                  <div key={board._id} className='board-preview'>
                    <Link to={`/board/${board._id}`}>
                      <img src={boardPreview} alt='' />
                    </Link>
                  </div>
                );
              })
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ boardModule }) {
  return {
    boards: boardModule.boards,
  };
}

const mapDispatchToProps = {
  loadBoards,
};

export const WorkSpace = connect(
  mapStateToProps,
  mapDispatchToProps
)(_WorkSpace);
