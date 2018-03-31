import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

/** Entries Reducer */

const initialState = Immutable({
  entriesById: {},
  isFetching: false,
  error: undefined,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.ENTRIES_FETCHED:
    case types.ENTRIES_ADD:
    case types.ENTRIES_ADD_SNAPSHOT:
      return state.merge({
        isFetching: true,
      });
    case types.ENTRIES_FETCHED_SUCCESS:
      return state.merge({
        entriesById: action.entriesById,
        isFetching: false,
      });
    case types.ENTRIES_ADD_SUCCESS:
      return state.merge({
        entriesById: {
          ...state.entriesById,
          ...action.entryById,
        },
        isFetching: false,
      });
    case types.ENTRIES_ADD_SNAPSHOT_SUCCESS:
      return state.merge({
        entriesById: {
          ...state.entriesById,
          [action.entryId]: {
            ...state.entriesById[action.entryId],
            snapshots: state.entriesById[action.entryId].snapshots.concat(action.snapshot),
          },
        },
        isFetching: false,
      });
    case types.ENTRIES_DELETE:
    case types.ENTRIES_DELETE_SUCCESS:
      return state.merge({
        entriesById: Immutable.without(state.entriesById, action.id),
      });
    case types.ENTRIES_FETCHED_FAILURE:
    case types.ENTRIES_ADD_FAILURE:
    case types.ENTRIES_DELETE_FAILURE:
    case types.ENTRIES_ADD_SNAPSHOT_FAILURE:
      return state.merge({
        error: action.error.message,
        entriesById: {},
        isFetching: false,
      });
    default:
      return state;
  }
}
