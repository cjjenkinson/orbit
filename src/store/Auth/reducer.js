import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

/** Authentication Reducer */

const initialState = Immutable({
  isAuthenticated: false,
  token: undefined,
  isFetching: false,
  error: undefined,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        isFetching: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
        isFetching: false,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
      };
    case types.LOGOUT:
      return {};
    default:
      return state;
  }
}
