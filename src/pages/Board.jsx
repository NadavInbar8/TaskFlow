import React from 'react';
import { CardDetails } from './CardDetails.jsx';
import { Link, Route, Switch } from 'react-router-dom';

export const Board = () => {
  return (
    <div>
      <Route component={<CardDetails />} path='/board/carddetails' />

      <Link to='/board/carddetails'>to card details</Link>
      <h1>board</h1>
    </div>
  );
};

{
  /* <Route
  component={() => <MailCompose loadMails={this.loadMails} />}
  path='/mail/composemail'
/>; */
}
