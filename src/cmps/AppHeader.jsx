import React from 'react';
import { Link } from 'react-router-dom';

// import {WorkSpace} from '../pages/WorkSpace.jsx';
// import {Board} from '../pages/Board.jsx';

import logo from '../assets/imgs/logo/logo.svg';

export function AppHeader() {
  return (
    <div className='app-header'>
      <div className='main-header'>
        <div className='logo-container'>
          <Link to='/workspace'>
            <img src={logo} alt='taskflow logo' />
          </Link>
        </div>
        <nav className='flex'>
          <ul>
            <Link to='/board/'>
              <li className='board'>Board</li>
            </Link>
          </ul>
          <div className='user-avatar'>
            <div className='user-avatar-btn'>G</div>
          </div>
        </nav>
      </div>
    </div>
  );
}
