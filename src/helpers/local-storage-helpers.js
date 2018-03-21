import debounce from 'lodash/debounce';
import Immutable from 'seamless-immutable';

import { LOCAL_STORAGE_REDUX_KEY } from '../constants';

/**
 * updateLocalStorage
 * When a non-null value is provided it updates local-storage with the supplied value.
 * When `null` is provided, it erases all previously-stored local-storage data
 */
const updateLocalStorage = debounce(
  (value) =>
    value !== null
      ? localStorage.setItem(LOCAL_STORAGE_REDUX_KEY, value)
      : localStorage.removeItem(LOCAL_STORAGE_REDUX_KEY),
  500,
);

export const handleStoreUpdates = (store) => {
  const { ...relevantState } = store.getState();

  updateLocalStorage(JSON.stringify(relevantState));
};

export const clearReduxState = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_REDUX_KEY);

  updateLocalStorage(null);
};

export const getInitialState = () => {
  const stateFromStorage = localStorage.getItem(LOCAL_STORAGE_REDUX_KEY);

  const initialState = Immutable(JSON.parse(stateFromStorage || '{}'));

  return initialState;
};
