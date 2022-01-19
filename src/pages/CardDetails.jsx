import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { CardService } from '../services/card.service.js';
export function CardDetails({ board }) {
  const history = useHistory();
  const [card, setCard] = useState({
    id: '',
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
    console.log(card);
  }, []);

  function getCard() {
    if (!board) return;
    console.log(board);
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
    board.groups[listIdx].tasks.splice(1, currCardIdx);
    console.log(board);
  }

  function updateCard() {
    console.log(card);
    console.log(board);
  }

  console.log('hello');
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
                <input type='text-area' />
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

// card = {
// 	id:'',
// 	title:'',
// 	memebers:[],
// 	label:[],
// 	date: '',
// 	attachedLinks: [{},{}],
// 	cover : ''
// }
