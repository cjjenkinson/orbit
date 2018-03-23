import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import { getInitialState } from './helpers/local-storage-helpers';
import configureStore from './store/configureStore';

import ApiService from './services/api.service';

import App from './components/App';

const history = createHistory();
const initialState = getInitialState();

// hydrate the token from the initialState
if (initialState.auth && initialState.auth.token) {
  ApiService.getInstance().setToken(initialState.auth.token);
}

const store = configureStore(history, initialState);

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

export default Root;
