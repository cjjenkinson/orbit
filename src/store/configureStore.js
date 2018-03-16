import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

const configureStore = () => {
  const logger = createLogger();

  const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk, logger),
  );

  return store;
};

export default configureStore;
