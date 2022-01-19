import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { updateBoard } from '../store/board.action.js';
import { CardService } from '../services/card.service.js';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

export const CardDetails = () => {
  const { board } = useSelector(
    (state) => ({ board: state.boardModule.currBoard }),
    shallowEqual
  );

  const { boardId, listId, cardId } = useParams();
  const dispatch = useDispatch();

  const history = useHistory();

  const [card, setCard] = useState({
    id: '',
    description: 'hi',
    comments: [],
    title: '',
    memebers: [],
    label: [],
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
    // console.log('board', board);

    if (!board) return;
    // console.log(board.groups);
    let list = board.groups.find((group) => group.id === listId);
    // console.log('list', list);
    let currCard = list.tasks.find((task) => task.id === cardId);
    // console.log('currCard', currCard);
    return currCard;
  }

  function handleChange({ target }) {
    const field = target.name;
    const value = target.value;
    // console.log(field, value);
    setCard({ ...card, [field]: value });
    // console.log(card);
  }

  function deleteCard() {
    // console.log('delete card');
    let listIdx = board.groups.findIndex((group) => group.id === listId);
    let currCardIdx = board.groups[listIdx].tasks.findIndex(
      (task) => task.id === cardId
    );
    const updatedBoard = { ...board };
    updatedBoard.groups[listIdx].tasks.length > 1
      ? updatedBoard.groups[listIdx].tasks.splice(currCardIdx, 1)
      : updatedBoard.groups[listIdx].tasks.pop();
    // console.log(updatedBoard);
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

  function addComment(ev) {
    ev.preventDefault();
    // console.log(ev.target);
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
    // console.log(currCard);
    setCard(currCard);
    updateCard();
    setComment({ by: 'guest', txt: '' });
    // console.log(card);
  }

  function deleteComment(idx) {
    const currCard = card;
    currCard.comments.splice(idx, 1);
    setCard(currCard);
    console.log(currCard);
    updateCard();
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
                <div>
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
              </div>

              <div className='add-to-card'>
                <ul>
                  <li className='title-li'>Add to Card</li>
                  <li>Members</li>
                  <li>Labels</li>
                  <li>Checklist</li>
                  <li>Dates</li>
                  <li>Attachment</li>
                  <li>Cover</li>
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
