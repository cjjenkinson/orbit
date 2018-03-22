import { push } from 'react-router-redux';

import * as types from './actionTypes';

import ApiService from '../../services/api.service';
import AuthService from '../../services/auth.service';

// Instantiate the Authentication service
const authService = AuthService();

// TODO: show error in antd message on failed login attempts
export const login = formValues => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST });

    const { email, password } = formValues;

    const auth = await authService.login(email, password);

    if (!auth) {
      throw new Error('Failed to login');
    }

    const { token } = auth;

    // Set the token on the ApiService
    await ApiService.getInstance().setToken(token);

    dispatch({ type: types.LOGIN_SUCCESS, token });
    dispatch(push('/dashboard'));
  } catch (err) {
    dispatch({ type: types.LOGIN_FAILED, error: err });
  }
};

export const logout = () => async (dispatch) => {
  await authService.logout();
  dispatch({ type: types.LOGOUT });
  dispatch(push('/login'));
};
