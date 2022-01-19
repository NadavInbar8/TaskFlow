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
    debugger;
    if (!board) return;
    console.log(board);
    let list = board.groups.find((group) => group.id === listId);
    let currCard = list.tasks.find((task) => task.id === cardId);
    return currCard;
  }

  function handleChange({ target }) {
    const field = target.name;
    const value = target.value;
    console.log(field, value);
    setCard({ [field]: value });
    console.log(card);
  }

  console.log('hello');
  return (
    <div className='go-back-container'>
      <Link className='go-back-container' to={`/board/${board._id}`} />

      <div className='card-details'>
        <div className='card-details-top'>
          <input
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
              <li>Archive</li>
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
