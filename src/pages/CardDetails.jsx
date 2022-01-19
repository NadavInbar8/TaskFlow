import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { updateBoard } from '../store/board.action.js';
import { CardService } from '../services/card.service.js';

function _CardDetails({ updateBoard, board }) {
  const history = useHistory();

  const [card, setCard] = useState({
    id: '',
    description: '',
    title: '',
    memebers: [],
    label: [],
    date: '',
    attachedLinks: [],
    cover: '',
  });

  const { boardId, listId, cardId } = useParams();

  useEffect(async () => {
    setCard(getCard());
    // console.log(card);
  }, []);

  function getCard() {
    if (!board) return;
    // console.log(board);
    let list = board.groups.find((group) => group.id === listId);
    console.log('list', list);
    let currCard = list.tasks.find((task) => task.id === cardId);
    console.log('currCard', currCard);
    return currCard;
  }

  function handleChange({ target }) {
    const field = target.name;
    const value = target.value;
    console.log(field, value);
    setCard({ ...card, [field]: value });
    console.log(card);
  }

  function deleteCard() {
    console.log('delete card');
    let listIdx = board.groups.findIndex((group) => group.id === listId);
    let currCardIdx = board.groups[listIdx].tasks.findIndex(
      (task) => task.id === cardId
    );

    const updatedBoard = { ...board };
    updatedBoard.groups[listIdx].tasks.length > 1
      ? updatedBoard.groups[listIdx].tasks.splice(1, currCardIdx)
      : updatedBoard.groups[listIdx].tasks.pop();
    updateBoard(updatedBoard);
    history.push(`/board/${board._id}`);
  }

  function updateCard() {
    let listIdx = board.groups.findIndex((group) => group.id === listId);
    let currCardIdx = board.groups[listIdx].tasks.findIndex(
      (task) => task.id === cardId
    );
    const updatedBoard = { ...board };
    updatedBoard.groups[listIdx].tasks[currCardIdx] = card;
    updateBoard(updatedBoard);
  }

  return (
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
                  value={card.description}
                  onChange={handleChange}
                  onBlur={updateCard}
                  type='text-area'
                />
              </label>
            </div>
            <div>
              <label>
                Activity
                <input type='text' />
              </label>
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
  );
}

function mapStateToProps({ boardModule }) {
  return {
    boards: boardModule.boards,
  };
}

const mapDispatchToProps = {
  // loadBoards,
  updateBoard,
};

export const CardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CardDetails);

// card = {
// 	id:'',
// 	title:'',
// 	memebers:[],
// 	label:[],
// 	date: '',
// 	attachedLinks: [{},{}],
// 	cover : ''
// }
