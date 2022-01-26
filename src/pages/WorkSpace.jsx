import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { loadBoards, openModal } from '../store/board.action.js';
// import {loadBoards, addBoard, openModal} from '../store/';
import { userService } from '../services/user.service.js';
import boardPreview from '../assets/imgs/boardPreview.jpg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import usersvg from '../assets/imgs/usersvg.svg';
import star from '../assets/imgs/star.svg';
import goldStar from '../assets/imgs/goldStar.svg';
import blackStar from '../assets/imgs/blackStar.svg';
import logo from '../assets/imgs/favicon/taskflow-favicon.svg';
import { updateBoard } from '../store/board.action.js';

export const WorkSpace = () => {
  const history = useHistory();
  const { boards } = useSelector((state) => ({
    boards: state.boardModule.boards,
  }));

  const { modal } = useSelector((state) => ({
    modal: state.boardModule.modal,
  }));

  const dispatch = useDispatch();
  const location = useLocation();

  const loggedInUser = userService.getLoggedinUser();

  // console.log(loggedInUser);
  if (loggedInUser === null) userService.connectGuestUser();

  useEffect(() => {
    dispatch(loadBoards());
  }, []);
  useEffect(() => {
    getStarredBoards();
  }, [boards]);

  const [starredBoards, setStarredBoards] = useState([]);

  function getStarredBoards() {
    const boardsStarred = boards.filter((board) => {
      return board.starred === true;
    });
    setStarredBoards(boardsStarred);
  }
  function toggleModal(type) {
    dispatch(openModal());
  }

  function starBoard(ev, board) {
    ev.stopPropagation();
    // console.log(board);
    let newBoard = board;
    if (newBoard.starred === true) {
      newBoard.starred = false;
    } else {
      newBoard.starred = true;
      // console.log(newBoard);
    }

    dispatch(updateBoard(newBoard));
  }

  function connectUser() {
    if (loggedInUser === null) userService.connectGuestUser();
    else return;
  }

  const getBackground = (board) => {
    // return `${board.style.backgroundColor}`;
    // if (location.pathname === '/') return 'lightcyan';
    return board.style.userClicked
      ? board.style.backgroundColor
      : `url(${board.style.previewImgUrl})`;
    // console.log(background);
    // return background;
  };

  return (
    <div className='work-space'>
      {/* {console.log('render')} */}
      <div className='boards'>
        <h2 className='flex flex-center'>
          <img
            style={{ height: '30px', paddingRight: '20px' }}
            src={blackStar}
          />
          Star boards:
        </h2>
        <div className='star-boards-container'>
          {starredBoards &&
            starredBoards.map((starredBoard, idx) => {
              return (
                <div
                  key={idx}
                  style={
                    starredBoard?.style?.userClicked
                      ? { backgroundColor: getBackground(starredBoard) }
                      : { backgroundImage: getBackground(starredBoard) }
                  }
                  className='board-background-div preview-cover'
                >
                  <div
                    onClick={() => {
                      connectUser();
                      history.push(`/board/${starredBoard._id}`);
                    }}
                    className='star-board-preview'
                  >
                    <h3>{starredBoard.title}</h3>
                    <div className='star-svg'>
                      <img
                        onClick={(ev) => {
                          starBoard(ev, starredBoard);
                        }}
                        className='star-svg-img'
                        src={goldStar}
                        alt=''
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <h2 className='flex flex-center'>
          <img className='workspace-logo' src={logo} />
          WorkSpace:
        </h2>
        <div className='boards-container'>
          {boards.length &&
            boards.map((board, idx) => {
              console.log(board);
              return (
                <div
                  key={idx}
                  // onClick={() => history.push(`/board/${board._id}`)}
                  className='board-preview'
                >
                  <div
                    style={
                      board?.style?.userClicked
                        ? { backgroundColor: getBackground(board) }
                        : { backgroundImage: getBackground(board) }
                    }
                    className='board-background-div preview-cover'
                  >
                    {board.style?.backgroundColor && (
                      <div
                        onClick={() => {
                          connectUser();
                          history.push(`/board/${board._id}`);
                        }}
                        className='board-title-div'
                        // style={{ backgroundColor: board.style.backgroundColor }}
                      >
                        {console.log(board)}
                        <h3 className='workspace-board-title'>{board.title}</h3>
                        <div className='star-svg'>
                          {board.starred === false && (
                            <img
                              onClick={(ev) => {
                                starBoard(ev, board);
                              }}
                              className='star-svg-img'
                              src={star}
                              alt=''
                            />
                          )}

                          {board.starred === true && (
                            <img
                              onClick={(ev) => {
                                starBoard(ev, board);
                              }}
                              className='star-svg-img'
                              src={goldStar}
                              alt=''
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {!board.style?.backgroundColor && (
                    <div>
                      <img src={boardPreview} alt='' />
                      <div className='star-svg'>
                        <img src={star} alt='' />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          <div
            onClick={() => {
              toggleModal('createModal2');
            }}
            className='add-board-div'
          >
            <h3>Add Board</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

// function mapStateToProps({ boardModule }) {
//   return {
//     boards: boardModule.boards,
//   };
// }

// const mapDispatchToProps = {
//   loadBoards,
// };

// export const WorkSpace = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_WorkSpace);
