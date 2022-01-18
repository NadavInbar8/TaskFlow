import React from 'react';
import boardPreview from '../assets/imgs/boardPreview.jpg';
import { Link } from 'react-router-dom';

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
          <h1> Workspaces boards</h1>

          <div className='boards-container'>
            <Link to='/board'>
              <img className='board-preview' src={boardPreview} alt='' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
