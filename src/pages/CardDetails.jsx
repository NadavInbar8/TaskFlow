import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { updateBoard } from '../store/board.action.js';

// import { CardService } from '../services/card.service.js';
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
  const { board } = useSelector(
    (state) => ({ board: state.boardModule.currBoard }),
    shallowEqual
  );

  const { boardId, listId, cardId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // MODALS
  const [memberModal, toggleMemeberModal] = useState(false);
  const [labelsModal, toggleLabelsModal] = useState(false);
  const [checklistModal, toggleChecklistModal] = useState(false);
  const [datesModal, toggleDatesModal] = useState(false);
  const [attachmentModal, toggleAttachmentModal] = useState(false);
  const [coverModal, toggleCoverModal] = useState(false);

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

  const [comment, setComment] = useState({
    by: 'guest',
    txt: '',
  });

  useEffect(async () => {
    setCard(getCard());
    // console.log(card);
  }, []);

  function getCard() {
    if (!board) return;
    let list = board.groups.find((group) => group.id === listId);
    let currCard = list.tasks.find((task) => task.id === cardId);
    return currCard;
  }

  function handleChange({ target }) {
    const field = target.name;
    const value = target.value;
    setCard({ ...card, [field]: value });
  }

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

  function updateCard() {
    let listIdx = board.groups.findIndex((group) => group.id === listId);
    let currCardIdx = board.groups[listIdx].tasks.findIndex(
      (task) => task.id === cardId
    );
    const updatedBoard = { ...board };
    updatedBoard.groups[listIdx].tasks[currCardIdx] = card;
    dispatch(updateBoard(updatedBoard));
  }
  function handleCommentChange({ target }) {
    const field = target.name;
    const value = target.value;
    setComment({ by: 'guest', txt: value });
  }

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

  function addDate(date) {
    const currCard = card;
    currCard.date = date;
    setCard(currCard);
    updateCard();
  }

  function addLabel(type) {
    console.log(type);
    const currCard = card;
    currCard.labels ? currCard.labels.push(type) : (currCard.labels = [type]);
    setCard(currCard);
    console.log(currCard);
    updateCard();
  }

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

          <div className='card-details'>
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
                <div className='date-on-details'></div>
                {card.date && <h2>{card.date}</h2>}
                <div>
                  {card.labels && (
                    <div className='labels-preview'>
                      {card.labels.map((label, idx) => {
                        return (
                          <div
                            style={{ backgroundColor: label }}
                            className='card-details-labels-preview'
                          ></div>
                        );
                      })}
                    </div>
                  )}
                  <label>
                    Description
                    <input
                      name='description'
                      value={card.description || ''}
                      onChange={handleChange}
                      onBlur={updateCard}
                      type='text-area'
                    />
                  </label>
                </div>
                <div>
                  Activity
                  <form onSubmit={addComment} action=''>
                    <label>
                      Add Comment
                      <input
                        value={comment.txt}
                        name='comment'
                        onChange={handleCommentChange}
                        type='text'
                      />
                    </label>
                  </form>
                </div>

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
                  <li onClick={() => toggleModal('attachment')}>Attachment</li>
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
