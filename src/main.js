/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import Root from './Root';

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

module.hot.accept();
