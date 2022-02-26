import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeBoard, updateBoard } from '../../store/board.action.js';

// Dyanmic Cmps
import { DefaultMenu } from '../boardMenuCmps/DefaultMenu.jsx';
import { Archive } from '../boardMenuCmps/Archive.jsx';
import { ChangeBackground } from '../boardMenuCmps/ChangeBackground.jsx';

// images
import backBtn from '../../assets/imgs/back-btn.svg';
import closeBtn from '../../assets/imgs/close.svg';

// Services
import { utilService } from '../../services/util.service.js';

export const BoardMenu = ({ menuOpen, setMenuOpen, loggedInUser }) => {
  const { board } = useSelector(
    (state) => ({ board: state.boardModule.currBoard }),
    shallowEqual
  );
  const [menuTitle, setMenuTitle] = useState('Menu');
  const [cmpToRender, setCmpToRender] = useState('defaultMenu');

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setMenuTitle('Menu');
    setCmpToRender('defaultMenu');
  }, []);

  const onRemoveBoard = () => {
    dispatch(removeBoard(board._id));
    history.push('/workspace');
  };

  const onSetMenuTitle = (title) => {
    let menuTitle;
    title ? (menuTitle = title) : (menuTitle = 'Menu');
    setMenuTitle(menuTitle);
  };

  const onSetCmpToRender = (cmp) => {
    setCmpToRender(cmp);
  };

  const changeBG = (entityType, entity) => {
    const updatedBoard = { ...board };
    if (entityType === 'color') {
      updatedBoard.style.backgroundColor = entity;
      updatedBoard.style.userClicked = true;
    } else if (entityType === 'img') {
      updatedBoard.style.imgUrl = entity.full;
      updatedBoard.style.previewImgUrl = entity.preview;
      updatedBoard.style.userClicked = false;
    }

    let activity = {
      user: loggedInUser,
      msg: `Updated board background`,
      time: utilService.getNiceDate(),
    };
    updatedBoard.activities.unshift(activity);
    dispatch(updateBoard(updatedBoard));
  };

  return (
    <section className={menuOpen ? 'board-menu shown' : 'board-menu'}>
      <div className='board-menu-inner'>
        <div className='modal-top'>
          {menuTitle !== 'Menu' && (
            <img
              className='back-btn-img pointer'
              src={backBtn}
              alt='back-img'
              onClick={() => {
                onSetMenuTitle('Menu');
                onSetCmpToRender('defaultMenu');
              }}
            />
          )}
          <span>{menuTitle}</span>
          <img
            src={closeBtn}
            className='close-btn pointer'
            alt='close'
            onClick={() => {
              setMenuOpen(!menuOpen);
              onSetCmpToRender('defaultMenu');
            }}
          ></img>
        </div>
        {cmpToRender === 'defaultMenu' && (
          <DefaultMenu
            onSetCmpToRender={onSetCmpToRender}
            onSetMenuTitle={onSetMenuTitle}
            onRemoveBoard={onRemoveBoard}
            board={board}
          />
        )}
        {cmpToRender === 'Archive' && <Archive />}
        {cmpToRender === 'changeBackground' && (
          <ChangeBackground
            board={board}
            changeBG={changeBG}
            setCmpToRender={setCmpToRender}
          />
        )}
      </div>
    </section>
  );
};
