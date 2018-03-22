import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import thunk from 'redux-thunk';

import { handleStoreUpdates } from '../../helpers/local-storage-helpers';
import rootReducer from '../reducers';

export default function configureStore(history, initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(routerMiddleware(history), thunk)),
  );

  // Hydrate state from localStorage
  store.subscribe(() => {
    handleStoreUpdates(store);
  });

  return store;
}
