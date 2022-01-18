import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

// const { createStore, combineReducers } = Redux
// const { applyMiddleware } = Redux
// const thunk = ReduxThunk.default

import { boardReducer } from './board.reducer.js';
import { listReducer } from './list.reducer.js';

const rootReducer = combineReducers({
  boardModule: boardReducer,
  listModule: listReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
