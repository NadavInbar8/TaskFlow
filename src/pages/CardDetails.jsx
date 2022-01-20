import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { updateBoard } from '../store/board.action.js';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  Members,
  Labels,
  Checklist,
  Dates,
  Attachment,
  Cover,
} from '../cmps/detailsModals/modals.jsx';

export const CardDetails = () => {
  // CURRBOARD
  const { board } = useSelector(
    (state) => ({ board: state.boardModule.currBoard }),
    shallowEqual
  );
  const { listId, cardId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // MODALS
  const [memberModal, toggleMemeberModal] = useState(false);
  const [labelsModal, toggleLabelsModal] = useState(false);
  const [checklistModal, toggleChecklistModal] = useState(false);
  const [datesModal, toggleDatesModal] = useState(false);
  const [attachmentModal, toggleAttachmentModal] = useState(false);
  const [coverModal, toggleCoverModal] = useState(false);

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

  function deleteComment(idx) {
    const currCard = card;
    currCard.comments.splice(idx, 1);
    setCard(currCard);
    console.log(currCard);
    updateCard();
  }

  // ADD DATE
  function addDate(date) {
    const currCard = card;
    currCard.date = date;
    setCard(currCard);
    updateCard();
  }

  // ADD LABEL
  function addLabel(label) {
    const currCard = card;
    currCard.labels ? currCard.labels.push(label) : (currCard.labels = [label]);
    setCard(currCard);
    console.log(currCard);
    updateCard();
  }

  // TOGLLING ALL MODALS
  function toggleModal(type) {
    type === 'member' && toggleMemeberModal(!memberModal);
    type === 'labels' && toggleLabelsModal(!labelsModal);
    type === 'checklist' && toggleChecklistModal(!checklistModal);
    type === 'dates' && toggleDatesModal(!datesModal);
    type === 'attachment' && toggleAttachmentModal(!attachmentModal);
    type === 'cover' && toggleCoverModal(!coverModal);
  }

  return (
    <div>
      {board.groups ? (
        <div className='go-back-container'>
          <Link className='go-back-container' to={`/board/${board._id}`} />

          <section className='card-details'>
            <div className='card-details-layout'>
              <div className='card-details-top'>
                <input
                  onBlur={updateCard}
                  onChange={handleChange}
                  name='title'
                  value={card.title}
                  type='text-area'
                />
                <Link to={`/board/${board._id}`}>
                  <button>X</button>
                </Link>
              </div>

              <div className='card-details-main'>
                <div className='edit-actions'>
                  <div className='date-on-details'>
                    {card.date && <h2>{card.date}</h2>}
                  </div>
                  <div>
                    {card.labels && (
                      <div className='labels-preview'>
                        {card.labels.map((label, idx) => {
                          return (
                            <div
                              key={idx}
                              className={
                                'card-details-labels-preview label-' +
                                label.color
                              }
                            >
                              {label.name}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <label className='description'>
                      Description:
                      <br />
                      <textarea
                        placeholder='Write your card description..'
                        name='description'
                        rows='10'
                        value={card.description || ''}
                        onChange={handleChange}
                        onBlur={updateCard}
                        type='text-box'
                      />
                    </label>
                  </div>
                  <div className='activity'>Activity</div>
                  <form
                    className='add-comment-form'
                    onSubmit={addComment}
                    action=''
                  >
                    <label>
                      Add Comment
                      <br />
                      <input
                        value={comment.txt}
                        name='comment'
                        onChange={handleCommentChange}
                        type='text'
                        placeholder='Add comment...'
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
                  {memberModal && <Members />}
                  {labelsModal && <Labels addLabel={addLabel} />}
                  {checklistModal && <Checklist />}
                  {datesModal && (
                    <Dates toggleModal={toggleModal} addDate={addDate} />
                  )}
                  {attachmentModal && <Attachment />}
                  {coverModal && <Cover />}
                </div>

                <div className='add-to-card'>
                  <ul>
                    <li className='title-li'>Add to Card</li>
                    <li onClick={() => toggleModal('member')}>Members</li>
                    <li onClick={() => toggleModal('labels')}>Labels</li>
                    <li onClick={() => toggleModal('checklist')}>Checklist</li>
                    <li onClick={() => toggleModal('dates')}>Dates</li>
                    <li onClick={() => toggleModal('attachment')}>
                      Attachment
                    </li>
                    <li onClick={() => toggleModal('cover')}>Cover</li>
                  </ul>
                  <ul>
                    <li className='title-li'>Actions</li>
                    <li>Move</li>
                    <li>Copy</li>
                    <li onClick={deleteCard}>Archive</li>
                  </ul>
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
