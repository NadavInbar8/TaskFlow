import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes.js';

export function RootCmp() {
  return (
    <div>
      <main>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact
              component={route.component}
              path={route.path}
            />
          ))}
        </Switch>
      </main>
    </div>
  );
}

// function mapStateToProps({ toyModule }) {
//     return {
//       isModalShown: toyModule.isModalShown,
//     };
//   }

//   const mapDispatchToProps = {
//     toggleModal,
//   };

//   export const RootCmp = connect(mapStateToProps, mapDispatchToProps)(_RootCmp);
