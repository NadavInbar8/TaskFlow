import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { updateBoard, openModal } from '../store/board.action.js';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  Members,
  Labels,
  Checklist,
  Dates,
  Attachment,
  Cover,
  Move,
} from '../cmps/detailsModals/modals.jsx';
import { DetailscheckList } from '../cmps/detailsCmps/DetailsCmps.jsx';

import description from '../assets/imgs/description.svg';
import user from '../assets/imgs/usersvg.svg';
import label from '../assets/imgs/label.svg';
import checklist from '../assets/imgs/checklist.svg';
import date from '../assets/imgs/date.svg';
import attachment from '../assets/imgs/attachment.svg';
import cover from '../assets/imgs/cover.svg';
import move from '../assets/imgs/move.svg';
import copy from '../assets/imgs/copy.svg';
import archive from '../assets/imgs/archive.svg';
import activity from '../assets/imgs/activity.svg';
import title from '../assets/imgs/title.svg';
import plus from '../assets/imgs/plus.svg';

export const CardDetails = () => {
  // CURRBOARD
  const { board } = useSelector(
    (state) => ({ board: state.boardModule.currBoard }),
    shallowEqual
  );

  // Modal state
  const { modal } = useSelector((state) => ({
    modal: state.boardModule.modal,
  }));

  const { listId, cardId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // // MODALS
  // const [memberModal, toggleMemeberModal] = useState(false);
  // const [labelsModal, toggleLabelsModal] = useState(false);
  // const [checklistModal, toggleChecklistModal] = useState(false);
  // const [datesModal, toggleDatesModal] = useState(false);
  // const [attachmentModal, toggleAttachmentModal] = useState(false);
  // const [coverModal, toggleCoverModal] = useState(false);

  // EMPTYCARD
  const [card, setCard] = useState({
    id: '',
    description: 'hi',
    comments: [],
    title: '',
    memebers: [],
    labels: [],
    date: '',
    attachedLinks: [],
    cover: '',
  });

  // EMPTYCOMMENT
  const [comment, setComment] = useState({ by: 'guest', txt: '' });

  // SETTING THE CURR CARD
  useEffect(async () => {
    setCard(getCard());
  }, []);

  // GET CARD FROM CURR BOARD USING PARAMS
  function getCard() {
    if (!board) return;
    let list = board.groups.find((group) => group.id === listId);
    let currCard = list.tasks.find((task) => task.id === cardId);
    return currCard;
  }

  // HANDLE SIMPLE INPUTS CHANGE
  function handleChange({ target }) {
    const field = target.name;
    const value = target.value;
    setCard({ ...card, [field]: value });
  }

  // DELETING...
  function deleteCard() {
    let listIdx = board.groups.findIndex((group) => group.id === listId);
    let currCardIdx = board.groups[listIdx].tasks.findIndex(
      (task) => task.id === cardId
    );
    const updatedBoard = { ...board };
    updatedBoard.groups[listIdx].tasks.length > 1
      ? updatedBoard.groups[listIdx].tasks.splice(currCardIdx, 1)
      : updatedBoard.groups[listIdx].tasks.pop();
    dispatch(updateBoard(updatedBoard));
    history.push(`/board/${board._id}`);
  }

  // UPDATING CARD,CURRBOARD IN STORE ,BOARDS IN STORE , AND ALL BOARDS IN DATABASE
  function updateCard() {
    let listIdx = board.groups.findIndex((group) => group.id === listId);
    let currCardIdx = board.groups[listIdx].tasks.findIndex(
      (task) => task.id === cardId
    );
    const updatedBoard = { ...board };
    updatedBoard.groups[listIdx].tasks[currCardIdx] = card;
    dispatch(updateBoard(updatedBoard));
  }

  // CREATING COMMENT
  function handleCommentChange({ target }) {
    const field = target.name;
    const value = target.value;
    setComment({ by: 'guest', txt: value });
  }

  // ADD COMMENTS
  function addComment(ev) {
    ev.preventDefault();
    const currCard = card;
    currCard.comments
      ? currCard.comments.push(comment)
      : (currCard.comments = [comment]);
    setCard(currCard);
    updateCard();
    setComment({ by: 'guest', txt: '' });
  }
  // ADD DATE
  function addDate(date) {
    console.log(Date.now() - date.getTime());
    const isOverDue = date.getTime() - Date.now() > 0 ? false : true;
    const currCard = card;
    currCard.date = {
      date: date.toLocaleDateString(),
      isComplete: false,
      overDue: isOverDue,
    };
    setCard(currCard);
    updateCard();
  }

  function toggleDateComplete() {
    console.log('changing');
    const currCard = card;
    currCard.date.isComplete = !currCard.date.isComplete;
    setCard(currCard);
    updateCard();
  }

  function deleteComment(idx) {
    const currCard = card;
    currCard.comments.splice(idx, 1);
    setCard(currCard);
    // console.log(currCard);
    updateCard();
  }

  // ADD LABEL
  function addLabel(label) {
    const currCard = card;
    currCard.labels ? currCard.labels.push(label) : (currCard.labels = [label]);
    setCard(currCard);
    // console.log(currCard);
    updateCard();
  }

  function deleteLabel(idx) {
    const currCard = card;
    currCard.labels.splice(idx, 1);
    setCard(currCard);
    updateCard();
    console.log(currCard);
  }

  function updateLabelsList(newlabels) {
    console.log('lalallalala');
    console.log(newlabels);
    const newBoard = board;
    newBoard.labelOptions = newlabels;
    dispatch(updateBoard(newBoard));
  }

  // ADD CHECKLIST
  function addCheckList(checkList) {
    const currCard = card;
    currCard.checkLists?.length > 0
      ? currCard.checkLists.push(checkList)
      : (currCard.checkLists = [checkList]);
    setCard(currCard);
    // console.log(currCard);
    updateCard();
  }

  function saveItemToCheckList(str, idx) {
    const item = { txt: str, isDone: false };
    const currCard = card;
    currCard.checkLists[idx].items.push(item);
    setCard(currCard);
    updateCard();
  }

  function updateCheckList(newCheckList, idx, itemIdx) {
    const currCard = card;
    currCard.checkLists[idx].items[itemIdx].isDone =
      !card.checkLists[idx].items[itemIdx].isDone;
    setCard(currCard);
    updateCard();
  }

  function deleteItemFromCheckList(listIdx, itemIdx) {
    const currCard = card;
    currCard.checkLists[listIdx].items.splice(itemIdx, 1);
    setCard(currCard);
    updateCard();
  }

  function deleteCheckList(checkListIdx) {
    const currCard = card;
    currCard.checkLists.splice(checkListIdx, 1);
    setCard(currCard);
    updateCard();
  }

  // COVER
  function addCover(cover, type) {
    const currCard = card;
    currCard.cover = { cover, type };

    setCard(currCard);
    updateCard();
  }
  // ATTACHMENTS
  function attachLink(link) {
    console.log(link);
    const currCard = card;
    currCard.attachments
      ? currCard.attachments.push(link)
      : (currCard.attachments = [link]);
    setCard(currCard);
    updateCard();
  }

  function deleteAttachment(idx) {
    console.log(idx);
    const currCard = card;
    if (currCard.attachments.length > 1) currCard.attachments.splice(1, idx);
    else currCard.attachments.pop();
    setCard(currCard);
    updateCard();
  }

  function deleteCover() {
    const currCard = card;
    delete currCard.cover;
    setCard(currCard);
    updateCard();
  }

  // ATTACHMENTS
  function attachLink(link) {
    console.log(link);
    const currCard = card;
    currCard.attachments
      ? currCard.attachments.push(link)
      : (currCard.attachments = [link]);
    setCard(currCard);
    updateCard();
    console.log(card);
  }

  function getStringTimeForImg(attachment) {
    let diff = Date.now() - attachment.createdAt;
    let str = '';
    if (diff < 1000 * 60) str = 'few seconds ago';
    else if (diff < 1000 * 60 * 60) str = 'few minutes ago';
    else if (diff < 1000 * 60 * 60 * 5) str = 'few hours ago';
    else if (diff < 1000 * 60 * 60 * 24) str = 'last day';
    else if (diff < 1000 * 60 * 60 * 24 * 4) str = 'few days ago';
    else if (diff < 1000 * 60 * 60 * 24 * 7) str = 'last week';
    else if (diff < 1000 * 60 * 60 * 24 * 7 * 3) str = 'last month';
    else if (diff < 1000 * 60 * 60 * 24 * 7 * 4 * 6) str = 'few months ago';
    else if (diff < 1000 * 60 * 60 * 24 * 7 * 4 * 12) str = 'last year';
    else if (diff < 1000 * 60 * 60 * 24 * 7 * 4 * 12 * 5) str = 'few years ago';
    else if (diff > 1000 * 60 * 60 * 24 * 7 * 4 * 12 * 5)
      str = 'more than five years ago ';

    return str;
  }

  // Move

  function moveCardToOtherList(chosenGroup, idx, type) {
    let currCard = card;
    let listIdx = board.groups.findIndex((group) => group.id === listId);
    let currCardIdx = board.groups[listIdx].tasks.findIndex(
      (task) => task.id === cardId
    );
    let newBoard = board;

    if (type === 'move') {
      // splicing from the list
      newBoard.groups[listIdx].tasks.splice(currCardIdx, 1);
    }
    // adding to list
    let chosenGroupIdx = newBoard.groups.findIndex(
      (group) => group.id === chosenGroup.id
    );
    newBoard.groups[chosenGroupIdx].tasks.splice(idx, 0, currCard);

    dispatch(updateBoard(newBoard));
  }

  // TOGLLING ALL MODALS
  function toggleModal(type) {
    // console.log('hi');
    dispatch(openModal(type));
    // type === 'member' && toggleMemeberModal(!memberModal);
    // type === 'labels' && toggleLabelsModal(!labelsModal);
    // type === 'checklist' && toggleChecklistModal(!checklistModal);
    // type === 'dates' && toggleDatesModal(!datesModal);
    // type === 'attachment' && toggleAttachmentModal(!attachmentModal);
    // type === 'cover' && toggleCoverModal(!coverModal);
  }

  return (
    <div>
      {board.groups ? (
        <div>
          <Link className='go-back-container' to={`/board/${board._id}`} />

          <section className='card-details'>
            {card.cover && (
              <div>
                {/* {console.log(card.cover)}
                {console.log(card.cover.cover)} */}

                {card.cover.type === 'color' && (
                  <section
                    className={
                      card.cover.cover + '-cover' + ' ' + 'card-details-cover'
                    }
                  >
                    <span
                      onClick={() => {
                        deleteCover();
                      }}
                    >
                      Delete Cover
                    </span>
                  </section>
                )}
                {card.cover.type === 'img' && (
                  <section className='cover-img flex flex-center'>
                    <img src={card.cover.cover} alt='' />
                  </section>
                )}
              </div>
            )}

            <div className='card-details-layout'>
              <div className='card-details-top'>
                <img className='details-larger-svg' src={title} />

                <div className='card-details-top-healine'>
                  <input
                    onBlur={updateCard}
                    onChange={handleChange}
                    name='title'
                    value={card.title}
                    type='text-area'
                  />
                </div>

                <Link to={`/board/${board._id}`}>
                  <button>x</button>
                </Link>
              </div>

              <div className='gap-right'>
                In list:
                <span> </span>
                <span style={{ textDecoration: 'underline' }}>
                  {card.id}
                </span>{' '}
              </div>

              <div className='card-details-main'>
                <div className='edit-actions'>
                  <section className=' gap-right labels-date-section'>
                    <section>
                      {card.labels?.length > 0 && (
                        <div>
                          <span className=''>Labels:</span>
                          <div className='labels-preview'>
                            {card.labels.map((label, idx) => {
                              return (
                                <div
                                  onClick={() => {
                                    deleteLabel(idx);
                                  }}
                                  key={idx}
                                  className={
                                    'card-details-labels-preview label-details-' +
                                    label.color
                                  }
                                >
                                  {label.name}
                                </div>
                              );
                            })}
                            <div
                              onClick={() => {
                                toggleModal('labelsModalLeft');
                              }}
                              className=' flex flex-center card-details-add-label'
                            >
                              <img src={plus} alt='' />
                              {modal === 'labelsModalLeft' && (
                                <Labels
                                  updateLabelsList={updateLabelsList}
                                  board={board}
                                  toggleModal={toggleModal}
                                  addLabel={addLabel}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </section>
                    <div className=' date-on-details'>
                      {card.date && (
                        <section className='date'>
                          <span>Due date</span>
                          <main>
                            <input
                              checked={card.date.isComplete}
                              onChange={toggleDateComplete}
                              type='checkbox'
                            />
                            {console.log(card.date.isComplete)}
                            <span
                              className='chosen-date'
                              onClick={() => toggleModal('dateModalLeft')}
                            >
                              {card.date.date}
                            </span>
                            &nbsp;
                            {card.date.isComplete && (
                              <span className='completed'> completed!</span>
                            )}
                            {card.date.overDue === true &&
                              !card.date.isComplete && (
                                <span className='overdue-span'>OVERDUE</span>
                              )}
                            {modal === 'dateModalLeft' && (
                              <Dates
                                toggleModal={toggleModal}
                                addDate={addDate}
                              />
                            )}
                          </main>
                        </section>
                      )}
                    </div>
                  </section>

                  <div className='description'>
                    <div className='description-title'>
                      <img
                        className='details-larger-svg'
                        src={description}
                        alt=''
                      />
                      <span>Description:</span>
                    </div>
                    <textarea
                      className='gap-right'
                      placeholder='Write your card description..'
                      name='description'
                      rows='10'
                      value={card.description || ''}
                      onChange={handleChange}
                      onBlur={updateCard}
                      type='text-box'
                    />
                  </div>

                  {card.attachments && (
                    <section className='gap-right card-details-attachments'>
                      {card.attachments.map((attachment, idx) => {
                        return (
                          <div key={idx} className='card-details-link'>
                            <section className='img-container flex flex-center'>
                              <img src={attachment.link} alt='img' />
                            </section>
                            <section className='link-description'>
                              <span className='name bold'>
                                {attachment.name}
                              </span>
                              <h4>
                                Added
                                {' ' + getStringTimeForImg(attachment) + ' '}
                                <span
                                  className='edit-cover-span'
                                  style={{ textDecoration: 'underline' }}
                                >
                                  Comment
                                </span>
                                -
                                <span
                                  onClick={() => {
                                    deleteAttachment(idx);
                                  }}
                                  className='edit-cover-span'
                                  style={{ textDecoration: 'underline' }}
                                >
                                  Delete
                                </span>
                                -
                                <span
                                  className='edit-cover-span'
                                  style={{ textDecoration: 'underline' }}
                                >
                                  Edit
                                </span>{' '}
                              </h4>
                              <h4
                                className='edit-cover-span'
                                onClick={() => {
                                  addCover(attachment.link, 'img');
                                }}
                              >
                                Make cover
                              </h4>
                            </section>
                          </div>
                        );
                      })}
                    </section>
                  )}

                  <br />
                  <div className='check-lists-container'>
                    {card.checkLists &&
                      card.checkLists.map((checkList, idx) => {
                        return (
                          <DetailscheckList
                            key={idx}
                            idx={idx}
                            card={card}
                            checkList={checkList}
                            saveItemToCheckList={saveItemToCheckList}
                            updateCheckList={updateCheckList}
                            deleteItemFromCheckList={deleteItemFromCheckList}
                            deleteCheckList={deleteCheckList}
                          />
                        );
                      })}
                  </div>

                  {/* {card.checkLists && (
                    <div className='checklist'>
                      <h2>{card.checkLists[0].title}</h2>

                      <meter value={getCheckListDontPrecents()}></meter>
                      <br />
                      <button>Add an item</button>
                    </div>
                  )} */}
                  <br />
                  <br />
                  <br />
                  <br />
                  <div className='activity'>
                    <img className='details-larger-svg' src={activity} />
                    <span>Activity</span>
                  </div>
                  <form
                    className='gap-right add-comment-form'
                    onSubmit={addComment}
                    action=''
                  >
                    <label>
                      <br />
                      <input
                        value={comment.txt}
                        name='comment'
                        onChange={handleCommentChange}
                        type='text'
                        placeholder='Write comment...'
                      />
                    </label>
                  </form>

                  <div className='comments'>
                    {card.comments && (
                      <ul>
                        {card.comments.map((comment, idx) => {
                          return (
                            <li key={idx}>
                              {comment.by}:{comment.txt}
                              <button onClick={() => deleteComment(idx)}>
                                delete
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  {/* <section className='modals-container'> */}
                  {/* {memberModal && <Members />}
                    {labelsModal && <Labels addLabel={addLabel} />}
                    {checklistModal && (
                      <Checklist
                        toggleModal={toggleModal}
                        addCheckList={addCheckList}
                      />
                    )}
                    {datesModal && (
                      <Dates toggleModal={toggleModal} addDate={addDate} />
                    )}
                    {attachmentModal && <Attachment />}
                    {coverModal && <Cover />} */}
                  {/* </section> */}
                </div>

                <div className='add-to-card'>
                  <section className='modals-container'>
                    <ul>
                      {/* /////////////////////////////////////////////// */}
                      <li className='title-li'>Add to Card</li>
                      {/* ////////////////////////////////////////////////////////////////////// */}
                      <li className='details-li'>
                        <span
                          className='li-span'
                          onClick={() => toggleModal('memberModal')}
                        >
                          <img className='details-svg' src={user} alt='' />
                          Members
                        </span>
                        {modal === 'memberModal' && <Members />}
                      </li>
                      {/* /////////////////////////////////////////////////////////////////// */}
                      <li className='details-li'>
                        <span
                          className='li-span'
                          onClick={() => toggleModal('labelsModal')}
                        >
                          <img className='details-svg' src={label} alt='' />
                          Labels
                        </span>
                        {modal === 'labelsModal' && (
                          <Labels
                            board={board}
                            toggleModal={toggleModal}
                            addLabel={addLabel}
                            updateLabelsList={updateLabelsList}
                          />
                        )}
                      </li>
                      {/* //////////////////////////////////////////////////////////////////// */}
                      <li className='details-li'>
                        <span
                          className='li-span'
                          onClick={() => toggleModal('checklistModal')}
                        >
                          <img className='details-svg' src={checklist} alt='' />
                          Checklist
                        </span>
                        {modal === 'checklistModal' && (
                          <Checklist
                            toggleModal={toggleModal}
                            addCheckList={addCheckList}
                          />
                        )}
                      </li>
                      {/* ////////////////////////////////////////////////// */}
                      <li className='details-li'>
                        <span
                          className='li-span'
                          onClick={() => toggleModal('datesModal')}
                        >
                          <img className='details-svg' src={date} alt='' />
                          Dates
                        </span>
                        {modal === 'datesModal' && (
                          <Dates toggleModal={toggleModal} addDate={addDate} />
                        )}
                      </li>
                      {/* ///////////////////////////////////////////////////// */}
                      <li className='details-li'>
                        <span
                          className='li-span'
                          onClick={() => toggleModal('attachmentModal')}
                        >
                          <img
                            className='details-svg'
                            src={attachment}
                            alt=''
                          />{' '}
                          Attachment
                        </span>
                        {modal === 'attachmentModal' && (
                          <Attachment
                            toggleModal={toggleModal}
                            attachLink={attachLink}
                          />
                        )}
                      </li>
                      {/* ////////////////////////////////////////////// */}
                      <li className='details-li'>
                        <span
                          className='li-span'
                          onClick={() => toggleModal('coverModal')}
                        >
                          <img className='details-svg' src={cover} alt='' />
                          Cover
                        </span>
                        {modal === 'coverModal' && (
                          <Cover
                            addCover={addCover}
                            toggleModal={toggleModal}
                          />
                        )}
                      </li>
                      {/* /////////////////////////////////////////////// */}
                    </ul>
                    <ul>
                      <li className='title-li'>Actions</li>
                      <li className='details-li'>
                        <span
                          className='li-span'
                          onClick={() => toggleModal('moveModal')}
                        >
                          <img className='details-svg' src={move} alt='' />
                          Move
                        </span>
                        {modal === 'moveModal' && (
                          <Move
                            type='move'
                            board={board}
                            moveCardToOtherList={moveCardToOtherList}
                            toggleModal={toggleModal}
                          />
                        )}
                      </li>

                      <li className='details-li'>
                        <span
                          className='li-span'
                          onClick={() => toggleModal('moveModalCopy')}
                        >
                          <img className='details-svg' src={copy} alt='' />
                          Copy
                        </span>
                        {modal === 'moveModalCopy' && (
                          <Move
                            type='copy'
                            board={board}
                            moveCardToOtherList={moveCardToOtherList}
                            toggleModal={toggleModal}
                          />
                        )}
                      </li>
                      <li onClick={deleteCard}>
                        <img className='details-svg' src={archive} alt='' />
                        Archive
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

// function mapStateToProps({ boardModule }) {
//   return {
//     boards: boardModule.boards,
//   };
// }

// const mapDispatchToProps = {
//   // loadBoards,
//   updateBoard,
// };

// export const CardDetails = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_CardDetails);

// card = {
// 	id:'',
// 	title:'',
// 	memebers:[],
// 	label:[],
// 	date: '',
// 	attachedLinks: [{},{}],
// 	cover : ''
// }
