import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadBoards } from '../store/board.action.js';

import boardPreview from '../assets/imgs/boardPreview.jpg';
import { Link } from 'react-router-dom';
import usersvg from '../assets/imgs/usersvg.svg';

const _WorkSpace = ({ loadBoards, boards }) => {
  const [stateBoards, setBoards] = useState([]);

  useEffect(async () => {
    loadBoards();
    setBoards(boards);
  }, []);

  useEffect(() => {
    console.log(stateBoards);
  }, [stateBoards]);

  return (
    <div className='work-space'>
      {/* {console.log(boards)} */}
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
            <div className='board-preview'>
              <Link to='/board/b102'>
                <img src={boardPreview} alt='' />
              </Link>
            </div>
            <div className='board-preview'>
              <Link to='/board/b101'>
                <img src={boardPreview} alt='' />
              </Link>
            </div>
            <div className='board-preview'>
              <Link to='/board'>
                <img src={boardPreview} alt='' />
              </Link>
            </div>
          </div>
        </div>

        <div className='boards'>
          <div className='headline'>
            <img className='usersvg' src={usersvg} alt='' />
            <h1 className='headling'> Workspaces boards</h1>
          </div>
          <div className='boards-container'>
            <div className='board-preview'>
              <Link to='/board'>
                <img src={boardPreview} alt='' />
              </Link>
            </div>
            <div className='board-preview'>
              <Link to='/board'>
                <img src={boardPreview} alt='' />
              </Link>
            </div>
            <div className='board-preview'>
              <Link to='/board'>
                <img src={boardPreview} alt='' />
              </Link>
            </div>
          </div>
        </div>
        <div className='boards'>
          <div className='headline'>
            <img className='usersvg' src={usersvg} alt='' />
            <h1 className='headling'> Workspaces boards</h1>
          </div>
          <div className='boards-container'>
            <div className='board-preview'>
              <Link to='/board'>
                <img src={boardPreview} alt='' />
              </Link>
            </div>
            <div className='board-preview'>
              <Link to='/board'>
                <img src={boardPreview} alt='' />
              </Link>
            </div>
            <div className='board-preview'>
              <Link to='/board'>
                <img src={boardPreview} alt='' />
              </Link>
            </div>
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
