// React
import React, { useEffect, useState } from 'react';

// Redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { updateBoard, openModal } from '../../store/board.action.js';

// Cmps
import { BoardFilter } from '../../cmps/boardCmps/BoardFilter.jsx';
import { BoardMenu } from '../../cmps/boardCmps/BoardMenu.jsx';
import { InviteModal } from '../../cmps/boardCmps/InviteModal.jsx';
import { Members } from './Members.jsx';

// imgs
import addUser from '../../assets/imgs/add-user.png';
import filterSvg from '../../assets/imgs/filter-svgs/filter.svg';
import whiteStar from '../../assets/imgs/whiteStar.svg';
import fullStar from '../../assets/imgs/starFill.svg';
import menuDots from '../../assets/imgs/menuDots.svg';

// Services
import { utilService } from '../../services/util.service.js';

export const BoardHeader = ({ setForceRender, filterBoard, forceRender }) => {
  const { board } = useSelector(
    (state) => ({ board: state.boardModule.currBoard }),
    shallowEqual
  );
  const { modal } = useSelector((state) => ({
    modal: state.boardModule.modal,
  }));
  const [width, setWidth] = useState('');
  const [boardTitleInput, setBoardTitleInput] = useState('');
  const { loggedInUser } = useSelector((state) => ({
    loggedInUser: state.userModule.loggedInUser,
  }));

  const { users } = useSelector((state) => ({
    users: state.userModule.users,
  }));

  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setBoardTitleInput(board.title);
  }, []);

  useEffect(() => {
    setBoardTitleInput(board.title);
    setWidth(board.title.length + 'ch');
  }, [board]);

  function handleBoardTitleChange({ target }) {
    if (!target || target === ' ') return;
    const value = target.value;
    setWidth(value.length + 'ch');
    setBoardTitleInput(value);
  }

  const updateBoardTitle = () => {
    const updatedBoard = { ...board };
    updatedBoard.title = boardTitleInput;
    let activity = {
      user: loggedInUser,
      msg: `Updated board title to: '${updatedBoard.title}'`,
      time: utilService.getNiceDate(),
    };
    updatedBoard.activities.unshift(activity);
    dispatch(updateBoard(updatedBoard));
    // }
    setForceRender(!forceRender);
  };

  const toggleModal = (type, ev) => {
    if (ev) ev.stopPropagation();
    dispatch(openModal(type));
  };

  const toggleStarring = () => {
    const updatedBoard = { ...board };
    updatedBoard.starred = !updatedBoard.starred;
    let activity = {
      user: loggedInUser,
      msg: updatedBoard.starred ? 'Starred this board' : 'Unstarred this board',
      time: utilService.getNiceDate(),
    };
    updatedBoard.activities.unshift(activity);
    dispatch(updateBoard(updatedBoard));
  };

  const openMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <header className='board-header'>
      <div className='header-left-container flex-center'>
        <input
          className='board-title'
          style={{ width }}
          onBlur={updateBoardTitle}
          onChange={handleBoardTitleChange}
          name='title'
          value={boardTitleInput}
          type='text-area'
          title={`Board name: ${boardTitleInput}`}
        />
        <div
          className='board-header-div star-container flex-center'
          onClick={() => {
            toggleStarring();
          }}
        >
          {board.starred && (
            <img className='star' src={fullStar} alt='Starred board'></img>
          )}
          {!board.starred && (
            <img className='star' src={whiteStar} alt='Unstarred board'></img>
          )}
        </div>
        <div className='users-div flex-center'>
          <Members
            board={board}
            loggedInUser={loggedInUser}
            toggleModal={toggleModal}
          />
          <div
            className='board-header-div invite-btn flex-center'
            onClick={(ev) => {
              toggleModal('inviteModal', ev);
            }}
          >
            <img className='add-user-img' src={addUser} alt='' />
            <span>Invite</span>
            {modal === 'inviteModal' && (
              <InviteModal
                users={users}
                loggedInUser={loggedInUser}
                board={board}
              />
            )}
          </div>
        </div>
      </div>
      <div className='actions-div flex'>
        <div
          className='board-header-div filter-div flex-center'
          onClick={() => {
            toggleModal('filterModal');
          }}
        >
          <span className='flex-center'>
            <img src={filterSvg} alt='filter-img' />
            Filter
          </span>
        </div>
        {modal === 'filterModal' && (
          <BoardFilter filterBoard={filterBoard} toggleModal={toggleModal} />
        )}
        <div
          className='menu-div board-header-div flex-center'
          onClick={() => {
            openMenu();
          }}
        >
          <img src={menuDots} alt='' />
          <span>Show menu</span>
        </div>
        <BoardMenu
          toggleModal={toggleModal}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          loggedInUser={loggedInUser}
        />
      </div>
    </header>
  );
};
