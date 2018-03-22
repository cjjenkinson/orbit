import debounce from 'lodash/debounce';
import Immutable from 'seamless-immutable';

import { LOCAL_STORAGE_REDUX_KEY } from '../constants';

const updateLocalStorage = debounce(
  value =>
    (value !== null
      ? localStorage.setItem(LOCAL_STORAGE_REDUX_KEY, value)
      : localStorage.removeItem(LOCAL_STORAGE_REDUX_KEY)),
  300,
);

export const handleStoreUpdates = (store) => {
  const { ...relevantState } = store.getState();

  updateLocalStorage(JSON.stringify(relevantState));
};

export const clearReduxState = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_REDUX_KEY);

  updateLocalStorage(null);
};

export const getStateFromStorage = () => {
  const stateFromStorage = localStorage.getItem(LOCAL_STORAGE_REDUX_KEY);
  return stateFromStorage;
};

export const getInitialState = () => {
  const stateFromStorage = getStateFromStorage();

  const initialState = Immutable(JSON.parse(stateFromStorage || '{}'));

  return initialState;
};

// export const getAuthToken = () => {
//   const stateFromStorage = getStateFromStorage();

//   const state = JSON.parse(stateFromStorage);

//   console.log('STATE FROM STORE', state);

//   const { token } = state.auth;

//   if (token) {
//     return token;
//   }

//   return '';
// };
