import { push } from 'react-router-redux';

import * as types from './actionTypes';
import * as utils from '../../utils';

import EntryService from '../../services/entries.service';

// instantiate the Entry service
const entryService = EntryService();

/** Entry Actions */

export const getEntries = id => async (dispatch) => {
  try {
    dispatch({ type: types.ENTRIES_FETCHED });

    const data = await entryService.fetchEntries(id);

    if (!data.length) {
      throw new Error('Entries fetch request failed');
    }

    // normalise entries
    const entriesById = utils.keyById(data, '_id');

    dispatch({ type: types.ENTRIES_FETCHED_SUCCESS, entriesById });
  } catch (err) {
    dispatch({
      type: types.ENTRIES_FETCHED_FAILURE,
      error: err,
    });
  }
};

export const addEntry = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: types.ENTRIES_ADD });

    const { name } = formData;
    const entryData = {
      name,
    };

    const entry = await entryService.createEntry(id, entryData);

    const { errors } = entry;

    if (errors) {
      throw new Error('A entry with this name already exists, please use a different name.');
    }

    // normalise
    const entryById = utils.keyById([entry], '_id');

    dispatch({ type: types.ENTRIES_ADD_SUCCESS, entryById });
    dispatch(push(`/workspace/${id}`));
  } catch (err) {
    dispatch({
      type: types.ENTRIES_ADD_FAILURE,
      error: err,
    });
    dispatch(push(`/workspace/${id}`));
  }
};

export const deleteEntry = id => async (dispatch) => {
  try {
    dispatch({ type: types.ENTRIES_DELETE });

    const response = await entryService.deleteEntry(id);

    if (!response.ok) {
      throw new Error('Failed to delete entry');
    }

    dispatch({ type: types.ENTRIES_DELETE_SUCCESS, id });
  } catch (err) {
    dispatch({ type: types.ENTRIES_ADD_FAILURE, error: err });
  }
};
