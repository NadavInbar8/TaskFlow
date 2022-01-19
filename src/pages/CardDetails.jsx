import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { CardService } from '../services/card.service.js';
export function CardDetails({ board }) {
  const history = useHistory();
  const [card, setCard] = useState({});

  const { boardId, listId, cardId } = useParams();
  //   console.log(params);
  //   const id = useRouteMatch(`/b102/:cardId`);
  //   console.log(id);
  useEffect(async () => {
    // console.log(cardId);
    setCard(getCard());
  }, []);

  function getCard() {
    let list = board.groups.find((group) => group.id === listId);
    let currCard = list.tasks.find((task) => task.id === cardId);
    return currCard;
  }

  //   function getCard() {
  //     const { id } = useParams();
  //     console.log(id);
  //   }

  console.log('hello');
  return (
    <div className='go-back-container'>
      <Link className='go-back-container' to={`/board/${board._id}`} />

      <div className='card-details'>
        <div className='card-details-top'>
          <h1>{card.title}</h1>
          <Link to={`/board/${board._id}`}>
            <button>X</button>
          </Link>
        </div>

        <div className='card-details-main'>
          <div className='edit-actions'>the edit actions is here</div>

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
