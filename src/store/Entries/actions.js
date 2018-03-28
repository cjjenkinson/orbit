import { push, goBack } from 'react-router-redux';

import * as types from './actionTypes';
import * as utils from '../../utils';

import EntryService from '../../services/entries.service';
import SnapshotService from '../../services/snapshots.service';

// instantiate the API services
const entryService = EntryService();
const snapshotService = SnapshotService();

/** Entry Actions */

export const getEntries = id => async (dispatch) => {
  try {
    dispatch({ type: types.ENTRIES_FETCHED });

    const entries = await entryService.fetchEntries(id);

    // normalise entries
    const entriesById = utils.keyById(entries, '_id');
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
    dispatch(goBack());
  }
};

export const deleteEntry = (workspaceId, id) => async (dispatch) => {
  try {
    dispatch({ type: types.ENTRIES_DELETE });

    const response = await entryService.deleteEntry(workspaceId, id);

    if (!response.ok) {
      throw new Error('Failed to delete entry');
    }

    dispatch({ type: types.ENTRIES_DELETE_SUCCESS });
    dispatch(push(`/workspace/${workspaceId}`));
  } catch (err) {
    dispatch({ type: types.ENTRIES_DELETE_FAILURE, error: err });
  }
};

export const addSnapshot = (workspaceId, entryId, formData) => async (dispatch) => {
  try {
    dispatch({ type: types.ENTRIES_ADD_SNAPSHOT });

    const { title, score } = formData;

    const scoreAsDecimal = score.map(s => ({
      label: s.label,
      score: s.score / 10,
    }));

    const snapshotData = {
      title,
      comments: '',
      enablers: scoreAsDecimal,
    };

    const snapshot = await snapshotService.createSnapshot(workspaceId, entryId, snapshotData);

    console.log(...snapshot);

    dispatch({ type: types.ENTRIES_ADD_SNAPSHOT_SUCCESS, entryId, ...snapshot });
    dispatch(goBack());
  } catch (err) {
    dispatch({
      type: types.ENTRIES_ADD_SNAPSHOT_FAILURE,
      error: err,
    });
    dispatch(goBack());
  }
};
