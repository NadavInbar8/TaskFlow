// images
import blackBoardImg from '../../assets/imgs/black-trello.svg';
import archive from '../../assets/imgs/archive.svg';
import trash from '../../assets/imgs/small-trash.svg';

import { Activity } from './Activity.jsx';

export const DefaultMenu = ({
  onSetMenuTitle,
  onSetCmpToRender,
  onOpenArchive,
  onRemoveBoard,
  board,
}) => {
  const getBackground = () => {
    return board?.style.userClicked
      ? board?.style.backgroundColor
      : `url(${board?.style?.previewImgUrl})`;
  };

  return (
    <section className='default-menu-cmp'>
      <div className='about-board flex flex-row align-center justify-center'>
        <div className='menu-container-svg align-center'>
          <img src={blackBoardImg} alt='board-img' />
        </div>
        &nbsp;
        <h5>About this board</h5>
      </div>
      <div
        className='change-board-background flex flex-row align-center justify-center pointer'
        onClick={() => {
          onSetMenuTitle('Change background');
          onSetCmpToRender('changeBackground');
        }}
      >
        <div
          className='board-background-img align-center preview-cover'
          style={
            board?.style?.userClicked
              ? { backgroundColor: getBackground() }
              : { backgroundImage: getBackground() }
          }
        ></div>
        &nbsp;
        <h5>Change background</h5>
      </div>
      <div
        className='menu-board-actions flex flex-row align-center justify-center pointer'
        onClick={() => {
          onSetMenuTitle('Archive');
          onSetCmpToRender('Archive');
        }}
      >
        <img src={archive} alt='' />
        &nbsp;
        <h5>Archive</h5>
      </div>
      <div
        className='menu-board-actions flex flex-row align-center justify-center pointer'
        onClick={() => onRemoveBoard()}
      >
        <img src={trash} alt='' />
        &nbsp;
        <h5>Remove board</h5>
      </div>
      <hr className='activity-hr'></hr>

      <Activity board={board} />
    </section>
  );
};
