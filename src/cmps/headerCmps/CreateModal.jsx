import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal, addBoard } from '../../store/board.action.js';

import { Colors } from '../boardCmps/Colors.jsx';
import { unsplashService } from '../../services/unsplash.service.js';

import boardPreviewSkeleton from '../../assets/imgs/board-preview-skeleton.svg';
import closeBtn from '../../assets/imgs/close.svg';

export const CreateModal = ({ loggedInUser }) => {
  const dispatch = useDispatch();

  const [newBoard, setNewBoard] = useState({});
  const [skeletonBoard, setSkeletonBoard] = useState({});
  const [boardTitleInput, setBoardTitleInput] = useState('');
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    setNewBoard({
      ...newBoard,
      createdBy: loggedInUser,
      members: [loggedInUser],
    });
    setSkeletonBoard({
      ...skeletonBoard,
      style: { userClicked: true, backGroundColor: 'white' },
    });
    getImgs();
  }, []);

  const getImgs = async () => {
    try {
      const imgs = await unsplashService.search('mountains', 4);
      setImgs(imgs);
    } catch (err) {
      console.log('couldnt get imgs', err);
    }
  };

  const addBG = (entityType, entity) => {
    if (entityType === 'color') {
      setNewBoard({
        ...newBoard,
        style: { userClicked: true, backgroundColor: entity },
      });
      setSkeletonBoard({
        ...skeletonBoard,
        style: { userClicked: true, backgroundColor: entity },
      });
    } else if (entityType === 'img') {
      setNewBoard({
        ...newBoard,
        style: {
          userClicked: false,
          imgUrl: entity.full,
          previewImgUrl: entity.preview,
        },
      });
      setSkeletonBoard({
        ...skeletonBoard,
        style: { userClicked: false, imgUrl: entity.preview },
      });
    }
  };

  const getBorderColor = () => {
    if (boardTitleInput.length === 0) return 'red';
    return 'grey';
  };

  const updateBoardTitle = () => {
    setNewBoard({
      ...newBoard,
      title: boardTitleInput,
    });
  };

  function handleBoardTitleChange({ target }) {
    if (!target) return;
    const value = target.value;
    setBoardTitleInput(value);
  }

  const toggleModal = (type) => {
    dispatch(openModal(type));
  };

  const getBackground = () => {
    if (skeletonBoard.style) {
      return skeletonBoard.style.userClicked
        ? skeletonBoard.style.backgroundColor
        : `url(${skeletonBoard.style.imgUrl})`;
    }
  };

  const saveNewBoard = () => {
    if (!newBoard.style) newBoard.style = { backgroundColor: '#0079bf' };
    dispatch(addBoard(newBoard));
  };

  return (
    <div className='create-modal flex'>
      <div className='modal-top'>
        <span className='modal-top-span'>Create</span>
        <img
          src={closeBtn}
          className='close-btn pointer'
          alt='close'
          onClick={() => toggleModal()}
        ></img>
      </div>
      <div>
        <div
          className='skeleton-div flex flex-center'
          style={
            skeletonBoard?.style?.userClicked
              ? { backgroundColor: getBackground() }
              : { backgroundImage: getBackground() }
          }
        >
          <img src={boardPreviewSkeleton} alt='' />
        </div>
        <div className='board-background'>
          <p>Background</p>
          <div className='imgs'>
            {imgs.map((img) => (
              <div
                key={img.id}
                className='img-container flex flex-center'
                onClick={() => addBG('img', img)}
              >
                <img className='unsplash-img' src={img.preview} alt={img.id} />
              </div>
            ))}
          </div>
          <Colors addBG={addBG} parentCmp={'createModal'} />
        </div>
        <div className='create-board-title-div'>
          <p>Board title</p>
          <input
            className='board-title-header m-y-m'
            onBlur={updateBoardTitle}
            onChange={handleBoardTitleChange}
            name='title'
            value={boardTitleInput}
            type='text-area'
            style={{ borderColor: getBorderColor() }}
          />
          {boardTitleInput.length === 0 && (
            <span>👋 Board title is required</span>
          )}
        </div>
        {boardTitleInput.length === 0 ? (
          <button
            disabled
            className='grey-btn disabled-btn create-board-btn m-y-m'
          >
            Create Board
          </button>
        ) : (
          <button
            className='blue-btn enabled-btn create-board-btn m-y-m'
            onClick={() => {
              toggleModal('createModal');
              saveNewBoard();
            }}
          >
            Create Board
          </button>
        )}
      </div>
    </div>
  );
};
