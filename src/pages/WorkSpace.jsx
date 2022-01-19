import React from 'react';
import boardPreview from '../assets/imgs/boardPreview.jpg';
import { Link } from 'react-router-dom';
import usersvg from '../assets/imgs/usersvg.svg';

export const WorkSpace = () => {
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
