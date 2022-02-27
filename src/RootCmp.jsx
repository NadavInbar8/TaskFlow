import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import routes from './routes.js';
import { AppHeader } from './cmps/AppHeader.jsx';
import { io } from 'socket.io-client';

// export const socket = io.connect(
//   'https://taskflow-nadav-tom-oded.herokuapp.com'
// );

export function RootCmp() {
  const { board } = useSelector(
    (state) => ({ board: state.boardModule.currBoard }),
    shallowEqual
  );
  const location = useLocation();

  const getBackground = () => {
    if (location.pathname.includes('/board') && board) {
      return board.style.userClicked
        ? board.style.backgroundColor
        : `url(${board.style.imgUrl})`;
    }
  };

  const getHeaderColor = () => {
    if (location.pathname.includes('/board') && board)
      return 'rgba(0, 0, 0, 0.45)';
    else if (location.pathname.includes('/workspace')) return '#026aa7';
  };

  return (
    <main
      className='root-cmp-main h100 flex-column'
      style={
        board?.style?.userClicked
          ? { backgroundColor: getBackground() }
          : { backgroundImage: getBackground() }
      }
    >
      <AppHeader style={{ backgroundColor: getHeaderColor() }} />
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            component={route.component}
            path={route.path}
          />
        ))}
      </Switch>
    </main>
  );
}
