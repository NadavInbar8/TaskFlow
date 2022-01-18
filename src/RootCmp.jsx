import React from 'react';
import { Switch, Route } from 'react-router';

export function RootCmp() {
  return (
    <div>
      <main>
        hi
        {/* <Switch>
            <Route component={Review} path='/review' />
          </Switch> */}
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
