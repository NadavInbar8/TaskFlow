import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { loadBoards, openModal } from '../store/board.action.js';
// import {loadBoards, addBoard, openModal} from '../store/';

import boardPreview from '../assets/imgs/boardPreview.jpg';
import { Link } from 'react-router-dom';
import usersvg from '../assets/imgs/usersvg.svg';

export const WorkSpace = () => {
  const { boards } = useSelector(
    (state) => ({ boards: state.boardModule.boards }),
    shallowEqual
  );

  const { modal } = useSelector((state) => ({
    modal: state.boardModule.modal,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBoards());
  }, []);

  function toggleModal(type) {
    dispatch(openModal());
  }

  return (
    <div className='work-space'>
      <div className='nav'>
        <ul>
          <li>Boards</li>
          <li>Templates</li>
          <li>Home</li>
          <li>work-space</li>
        </ul>

        <ul>
          <li>Boards</li>
          <li>hightlights</li>
          <li>WorkSpace table</li>
          <li>Members</li>
          <li>Settings</li>
        </ul>
      </div>

      <div className='workspaces-boards'>
        <div className='boards'>
          <div className='headline'>
            <img className='usersvg' src={usersvg} alt='' />
            <h1 className='headline'> Workspaces boards</h1>
          </div>

          <div className='boards-container'>
            {boards.length &&
              boards.map((board) => {
                return (
                  <div key={board._id} className='board-preview'>
                    <Link to={`/board/${board._id}`}>
                      <h3 className='workspace-board-title'>{board.title}</h3>
                      <div>
                        {board.style?.backgroundColor ? (
                          <div
                            className='board-background'
                            style={{
                              backgroundColor: board.style.backgroundColor,
                            }}
                          ></div>
                        ) : (
                          <img src={boardPreview} alt='' />
                        )}
                      </div>
                      {/* <img src='https://source.unsplash.com/random/1920x1080/?wallpaper,landscape' alt='' /> */}
                    </Link>
                  </div>
                );
              })}
            <div className='adding'>
              <h3>Add Board</h3>
              <div
                onClick={() => {
                  toggleModal('createModal2');
                }}
                className='add-board-div'
              ></div>
              {/* {modal==='createModal2'&&(

				)} */}
            </div>
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
