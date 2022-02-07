import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

// Redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { loadBoards, openModal, updateBoard } from '../store/board.action.js';

// Services
import { userService } from '../services/user.service.js';

// Cmps
import { CreateModal } from '../cmps/headerCmps/CreateModal.jsx';

// Images
import boardPreview from '../assets/imgs/boardPreview.jpg';
import usersvg from '../assets/imgs/usersvg.svg';
import star from '../assets/imgs/star.svg';
import goldStar from '../assets/imgs/goldStar.svg';
import whiteStar from '../assets/imgs/whiteStar.svg';
import logo from '../assets/imgs/favicon/taskflow-favicon.svg';
import { setUsers } from '../store/user.action.js';

export const WorkSpace = () => {
  const history = useHistory();
  const { boards } = useSelector((state) => ({
    boards: state.boardModule.boards,
  }));
  const [starredBoards, setStarredBoards] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();

  const { modal } = useSelector((state) => ({
    modal: state.boardModule.modal,
  }));
  const { users } = useSelector((state) => ({
    users: state.userModule.users,
  }));

  const dispatch = useDispatch();
  const location = useLocation();

  // const loggedInUser = userService.getLoggedinUser();

  useEffect(() => {
    dispatch(loadBoards());
    loadUsers();
    loadUser();
  }, []);

  const loadUsers = async () => {
    // debugger;
    const users = await userService.getUsers();
    dispatch(setUsers(users));
  };

  const loadUser = async () => {
    let user = userService.getLoggedinUser();
    if (!user) user = userService.connectGuestUser();
    setLoggedInUser(user);
  };

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

  // function connectUser() {
  // 	if (loggedInUser === null) userService.connectGuestUser();
  // 	else return;
  // }

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
          <img style={{ height: '30px', paddingRight: '20px' }} src={star} />
          Starred boards:
        </h2>
        {/* <div className='star-boards-container'>
					{starredBoards &&
						starredBoards.map((starredBoard, idx) => {
							return (
								<div
									key={idx}
									style={
										starredBoard?.style?.userClicked
											? {backgroundColor: getBackground(starredBoard)}
											: {backgroundImage: getBackground(starredBoard)}
									}
									className='board-background-div preview-cover'>
									<div
										onClick={() => {
											connectUser();
											history.push(`/board/${starredBoard._id}`);
										}}
										className='star-board-preview'>
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
				</div> */}

        <div className='boards-container'>
          {starredBoards &&
            starredBoards.map((starredBoard, idx) => {
              return (
                <div key={idx} className='preview-container'>
                  <div
                    // onClick={() => history.push(`/board/${board._id}`)}
                    className='board-preview'
                  >
                    <div
                      style={
                        starredBoard?.style?.userClicked
                          ? { backgroundColor: getBackground(starredBoard) }
                          : { backgroundImage: getBackground(starredBoard) }
                      }
                      className='board-background-div preview-cover'
                    >
                      {starredBoard.style?.backgroundColor && (
                        <div
                          onClick={() => {
                            // connectUser();
                            history.push(`/board/${starredBoard._id}`);
                          }}
                          className='board-title-div'
                          // style={{ backgroundColor: board.style.backgroundColor }}
                        >
                          {/* {console.log(starredBoard)} */}
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
                    {/* {!starredBoard.style?.backgroundColor && (
											<div>
												<img src={boardPreview} alt='' />
												<div className='star-svg'>
													<img src={star} alt='' />
												</div>
											</div>
										)} */}
                  </div>
                </div>
              );
            })}
        </div>

        <h2 className='flex flex-center'>
          <img className='workspace-logo' src={logo} />
          Work Space:
        </h2>
        <div className='boards-container'>
          {boards.length > 0 &&
            boards.map((board, idx) => {
              //   console.log(board);
              return (
                <div key={idx} className='preview-container'>
                  <div
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
                      {board.style && (
                        <div
                          onClick={() => {
                            // connectUser();
                            history.push(`/board/${board._id}`);
                          }}
                          className='board-title-div'
                          // style={{ backgroundColor: board.style.backgroundColor }}
                        >
                          {/* {console.log(board)} */}
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
                    {!board.style?.backgroundColor && (
                      <div>
                        <img src={boardPreview} alt='' />
                        <div className='star-svg'>
                          <img src={star} alt='' />
                        </div>
                      </div>
                    )}
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
