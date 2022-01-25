import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { loadBoards, openModal } from '../store/board.action.js';
// import {loadBoards, addBoard, openModal} from '../store/';
import { userService } from '../services/user.service.js';
import boardPreview from '../assets/imgs/boardPreview.jpg';
import { Link, useHistory } from 'react-router-dom';
import usersvg from '../assets/imgs/usersvg.svg';
import star from '../assets/imgs/star.svg';
import goldStar from '../assets/imgs/goldStar.svg';
import blackStar from '../assets/imgs/blackStar.svg';
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
  const loggedInUser = userService.getLoggedinUser();
  // console.log(loggedInUser);
  if (loggedInUser === null) userService.connectGuestUser();

  useEffect(() => {
    dispatch(loadBoards());
  }, []);
  useEffect(() => {
    getStaredBoards();
  }, [boards]);

  const [staredBoards, setStaredBoards] = useState([]);

  function getStaredBoards() {
    const boardsStared = boards.filter((board) => {
      return board.stared === true;
    });
    setStaredBoards(boardsStared);
  }
  function toggleModal(type) {
    dispatch(openModal());
  }

  function starBoard(ev, board) {
    ev.stopPropagation();
    console.log(board);
    let newBoard = board;
    if (newBoard.stared === true) {
      newBoard.stared = false;
    } else {
      newBoard.stared = true;
      console.log(newBoard);
    }

    dispatch(updateBoard(newBoard));
  }
  function connectUser() {
    if (loggedInUser === null) userService.connectGuestUser();
    else return;
  }

  return (
    <div className='work-space'>
      {console.log('render')}
      <div className='boards'>
        <h2 className='flex flex-center'>
          <img
            style={{ height: '30px', paddingRight: '20px' }}
            src={blackStar}
          />
          Star boards:
        </h2>
        <div className='star-boards-container'>
          {staredBoards &&
            staredBoards.map((staredBoard, idx) => {
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: staredBoard.style.backgroundColor,
                  }}
                  className='hover-opacity'
                >
                  <div
                    onClick={() => {
                      connectUser();
                      history.push(`/board/${staredBoard._id}`);
                    }}
                    className='star-board-preview'
                  >
                    <h3>{staredBoard.title}</h3>
                    <div className='star-svg'>
                      <img className='star-svg-img' src={goldStar} alt='' />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <h2>Work Space:</h2>
        <div className='boards-container'>
          {boards.length &&
            boards.map((board, idx) => {
              return (
                <div
                  key={idx}
                  // onClick={() => history.push(`/board/${board._id}`)}
                  className='board-preview'
                >
                  <div
                    style={{ backgroundColor: board.style.backgroundColor }}
                    className='hover-opacity'
                  >
                    {board.style?.backgroundColor && (
                      <div
                        onClick={() => {
                          connectUser();
                          history.push(`/board/${board._id}`);
                        }}
                        className='board-background'
                        // style={{ backgroundColor: board.style.backgroundColor }}
                      >
                        <h3 className='workspace-board-title'>{board.title}</h3>
                        <div className='star-svg'>
                          {board.stared === false && (
                            <img
                              onClick={(ev) => {
                                starBoard(ev, board);
                              }}
                              className='star-svg-img'
                              src={star}
                              alt=''
                            />
                          )}

                          {board.stared === true && (
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
