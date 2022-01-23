import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Cover } from '../detailsModals/modals.jsx';

// images
import blackBoardImg from '../../assets/imgs/black-trello.svg';

export const BoardMenu = ({ toggleModal }) => {
  const [coverModal, setCoverModal] = useState(false);

  function addCover(cover) {
    console.log(cover);
  }

  return (
    <section className='board-menu'>
      <div className='board-menu-inner'>
        <div className='modal-top'>
          <h3>Menu</h3>
          {/* <img onClick={() => toggleModal('menu')} src={close} alt='' /> */}
          <button onClick={() => toggleModal('menu')}>x</button>
        </div>
        <hr></hr>
        <div className='about-board flex flex-row align-center justify-center'>
          <div className='menu-container-svg align-center'>
            <img src={blackBoardImg} alt='board-img' />
          </div>
          &nbsp;
          <h5>About this board</h5>
          <br></br>
          <span>Add a descreption to your board</span>
        </div>
        <div
          onClick={() => {
            setCoverModal(!coverModal);
          }}
          className='change-board-background flex flex-row align-center justify-center'
        >
          <div className='board-background-img align-center'></div>
          &nbsp;
          <h5>Change background</h5>
          {coverModal && (
            <Cover addCover={addCover} toggleModal={toggleModal} />
          )}
        </div>
        <div className='activity'>
          <h2 className='acitivity-h2'>Activity</h2>
          <hr className='activity-hr'></hr>
        </div>
      </div>
    </section>
  );
};
