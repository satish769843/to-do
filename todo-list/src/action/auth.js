import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOAD_USER,
  AUTH_ERROR,
  LOGOUT,
} from './types';

import setAuthToken from '../utils/setAuthtoken';
// Load User
export const loadUser = () => dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    dispatch({
      type: LOAD_USER,
    });
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/login/', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    loadUser();
  } catch (err) {
    dispatch({
      type: LOGIN_ERROR,
    });
  }
};

// LOGOUT

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });
};
