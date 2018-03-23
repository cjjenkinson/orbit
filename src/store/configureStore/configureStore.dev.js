import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { handleStoreUpdates } from '../../helpers/local-storage-helpers';
import rootReducer from '../reducers';

const logger = createLogger();

export default function configureStore(history, initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk, logger)),
  );

  // Hydrate state from localStorage
  store.subscribe(() => {
    handleStoreUpdates(store);
  });

  return store;
}
