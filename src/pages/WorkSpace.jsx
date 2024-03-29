import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { openModal, updateBoard } from '../store/board.action.js';

// Cmps
import { CreateModal } from '../cmps/headerCmps/CreateModal.jsx';

// Images
import star from '../assets/imgs/star.svg';
import goldStar from '../assets/imgs/goldStar.svg';
import logo from '../assets/imgs/favicon/taskflow-favicon.svg';

export const WorkSpace = () => {
  const history = useHistory();
  const { boards } = useSelector((state) => ({
    boards: state.boardModule.boards,
  }));
  const [starredBoards, setStarredBoards] = useState([]);

  const { modal } = useSelector((state) => ({
    modal: state.boardModule.modal,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    getStarredBoards();
  }, [boards]);

  function getStarredBoards() {
    const boardsStarred = boards.filter((board) => {
      return board.starred === true;
    });
    setStarredBoards(boardsStarred);
  }
  function toggleModal(type) {
    dispatch(openModal(type));
  }

  function starBoard(ev, board) {
    ev.stopPropagation();
    let newBoard = board;
    if (newBoard.starred === true) {
      newBoard.starred = false;
    } else {
      newBoard.starred = true;
    }

    dispatch(updateBoard(newBoard));
  }

  const getBackground = (board) => {
    return board?.style?.userClicked
      ? board.style.backgroundColor
      : `url(${board?.style?.previewImgUrl})`;
  };

  return (
    <div className='work-space'>
      <div className='boards'>
        <h2 className='flex flex-center'>
          <img
            style={{ height: '30px', paddingRight: '20px' }}
            src={star}
            alt=''
          />
          Starred boards:
        </h2>
        <div className='boards-container'>
          {starredBoards &&
            starredBoards.map((starredBoard, idx) => {
              return (
                <div key={idx} className='preview-container'>
                  <div className='board-preview'>
                    <div
                      style={
                        starredBoard?.style?.userClicked
                          ? { backgroundColor: getBackground(starredBoard) }
                          : { backgroundImage: getBackground(starredBoard) }
                      }
                      className='board-background-div preview-cover'
                    >
                      {starredBoard.style && (
                        <div
                          onClick={() => {
                            history.push(`/board/${starredBoard._id}`);
                          }}
                          className='board-title-div'
                        >
                          <h3 className='workspace-board-title'>
                            {starredBoard.title}
                          </h3>
                          <div className='star-svg'>
                            {starredBoard.starred === false && (
                              <img
                                onClick={(ev) => {
                                  starBoard(ev, starredBoard);
                                }}
                                className='star-svg-img'
                                src={star}
                                alt=''
                              />
                            )}
                            {starredBoard.starred === true && (
                              <img
                                onClick={(ev) => {
                                  starBoard(ev, starredBoard);
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
                  </div>
                </div>
              );
            })}
        </div>

        <h2 className='flex flex-center'>
          <img className='workspace-logo' src={logo} alt='' />
          Work Space:
        </h2>
        <div className='boards-container'>
          {boards.length > 0 &&
            boards.map((board, idx) => {
              return (
                <div key={idx} className='preview-container'>
                  <div className='board-preview'>
                    <div
                      style={
                        board?.style?.userClicked
                          ? { backgroundColor: getBackground(board) }
                          : { backgroundImage: getBackground(board) }
                      }
                      className='board-background-div preview-cover'
                    >
                      {board.style && (
                        <div
                          onClick={() => {
                            history.push(`/board/${board._id}`);
                          }}
                          className='board-title-div'
                        >
                          <h3 className='workspace-board-title'>
                            {board.title}
                          </h3>
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
                  </div>
                </div>
              );
            })}
          <div
            onClick={() => {
              toggleModal('createModal');
            }}
            className='add-board-div'
          >
            <h3>Add Board</h3>
            {modal === 'createModal2' && <CreateModal parentCmp='workspace' />}
          </div>
        </div>
      </div>
    </div>
  );
};
