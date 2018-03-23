import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

/** Authentication Reducer */

const initialState = Immutable({
  isAuthenticated: false,
  user: undefined,
  token: null,
  isFetching: false,
  error: undefined,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
      return {
        isFetching: true,
      };
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        token: action.user.token,
        isFetching: false,
      };
    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
      };
    case types.LOGOUT:
      return {};
    default:
      return state;
  }
}
