import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
export function CardDetails() {
  const [card, setCard] = useState(null);

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    // setCard(getCard());
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
      </div>
    </div>
  );
}
