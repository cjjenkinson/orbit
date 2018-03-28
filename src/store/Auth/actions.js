import { push } from 'react-router-redux';

import * as types from './actionTypes';

import ApiService from '../../services/api.service';
import AuthService from '../../services/auth.service';

// Instantiate the Authentication service
const authService = AuthService();

const setAuthToken = (token) => {
  if (token) {
    ApiService.getInstance().setToken(token);
  }
};

// TODO: show error in antd message on failed login attempts
export const login = formValues => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST });

    const { email, password } = formValues;

    const user = await authService.login(email, password);

    if (user.errors) {
      throw new Error(user.errors);
    }

    const { token } = user;

    // Set the token on the ApiService
    await setAuthToken(token);

    dispatch({ type: types.LOGIN_SUCCESS, user });
    dispatch(push('/dashboard'));
  } catch (err) {
    dispatch({ type: types.LOGIN_FAILURE, error: err });
  }
};

export const register = formValues => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_REQUEST });

    const user = await authService.register(formValues);

    if (user.errors) {
      throw new Error(user.errors);
    }

    const { token } = user;

    // Set the token on the ApiService
    await setAuthToken(token);

    dispatch({ type: types.REGISTER_SUCCESS, user });
    dispatch(push('/dashboard'));
  } catch (err) {
    dispatch({ type: types.REGISTER_FAILURE, error: err });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT });
  await authService.logout();
  dispatch(push('/login'));
};
