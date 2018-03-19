import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
