import React from 'react';
import { Link } from 'react-router-dom';

export function CardDetails() {
  return (
    <div>
      <Link className='go-back-container' to='/board' />
      <div className='card-details'>
        <h1>card details</h1>
      </div>
    </div>
  );
}
