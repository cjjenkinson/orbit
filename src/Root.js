import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import { getInitialState } from './helpers/local-storage-helpers';
import configureStore from './store/configureStore';

import App from './components/App';

const history = createHistory();
const initialState = getInitialState();

const store = configureStore(history, initialState);

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

export default Root;
