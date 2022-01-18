import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { CardService } from '../services/card.service.js';
export function CardDetails() {
  const [card, setCard] = useState({});

  const { cardId } = useParams();

  useEffect(async () => {
    console.log(cardId);
    setCard(await CardService.getCardById());
  }, []);

  //   function getCard() {
  //     const { id } = useParams();
  //     console.log(id);
  //   }

  console.log('hello');
  return (
    <div>
      <Link className='go-back-container' to='/board' />

      <div className='card-details'>
        <div className='card-details-top'>
          <h1>card details</h1>
          <Link to='/board'>
            <button>X</button>
          </Link>
        </div>

        <div className='card-details-main'></div>
        <h1>{card.title}</h1>
        <h1>{card.id}</h1>
      </div>
    </div>
  );
}
