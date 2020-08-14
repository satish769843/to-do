import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOAD_USER,
  AUTH_ERROR,
  LOGOUT,
} from '../action/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_ERROR:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};
