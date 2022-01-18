import React from 'react';
import { CardDetails } from './CardDetails.jsx';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';

export class Board extends React.Component {
  render() {
    return (
      <div>
        <Link to='/board/carddetails'>to card details</Link>

        <Switch>
          <Route component={CardDetails} path='/board/carddetails' />
        </Switch>
      </div>
    );
  }
}
