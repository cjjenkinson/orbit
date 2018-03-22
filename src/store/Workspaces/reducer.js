import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

/** Workspaces Reducer */

const initialState = Immutable({
  workspacesById: {},
  isFetching: false,
  error: undefined,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.WORKSPACES_FETCHED:
    case types.WORKSPACES_ADD:
    case types.WORKSPACES_DELETE:
      return state.merge({
        isFetching: true,
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
    case types.WORKSPACES_DELETE_SUCCESS:
      return state.merge({
        isFetching: false,
        workspacesById: Immutable.without(state.workspacesById, action.id),
      });
    case types.WORKSPACES_FETCHED_FAILURE:
    case types.WORKSPACES_ADD_FAILURE:
    case types.WORKSPACES_DELETE_FAILURE:
      return state.merge({
        error: action.error.message,
        isFetching: false,
      });
    default:
      return state;
  }
}
