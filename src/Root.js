import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import store from './store/configureStore';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
