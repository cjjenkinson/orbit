import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

/** Workspaces Reducer */

const initialState = Immutable({
  workspacesById: undefined,
  isFetching: false,
  error: undefined,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.WORKSPACES_FETCHED:
      return state.merge({
        isFetching: true,
      });
    case types.WORKSPACES_ADD:
      return state.merge({
        isFetching: true,
        workspacesById: {
          ...state.workspacesById,
          ...action.workspaceByTempId,
        },
      });
    case types.WORKSPACES_FETCHED_SUCCESS:
      return state.merge({
        workspacesById: action.workspacesById,
        isFetching: false,
      });
    case types.WORKSPACES_ADD_SUCCESS:
      return state.merge({
        workspacesById: {
          ...state.workspacesById,
          ...action.workspaceById,
        },
        isFetching: false,
      });
    case types.WORKSPACES_FETCHED_FAILURE:
    case types.WORKSPACES_ADD_FAILURE:
      return state.merge({
        error: action.error.message,
        isFetching: false,
      });
    default:
      return state;
  }
}
