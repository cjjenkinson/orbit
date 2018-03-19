import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';

import * as reducers from './store/reducers';
import App from './containers/App';

const history = createHistory();

const configureStore = () => {
  const router = routerMiddleware(history);
  const logger = createLogger();

  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
    }),
    applyMiddleware(router, thunk, logger),
  );

  return store;
};

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

export default Root;
