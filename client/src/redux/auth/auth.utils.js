import { AUTH_TYPES } from './auth.types';

export const setAuthUser = (token, dispatch, data) => {
  if (!token) {
    return;
  }

  window.localStorage.setItem('jwt_token', token);
  console.log(data);

  dispatch({
    type: AUTH_TYPES.SET_AUTH_USER,
    payload: data
  });
};

export const logOut = (dispatch) => {
  dispatch({
    type: AUTH_TYPES.LOG_OUT_USER
  });

  window.localStorage.removeItem('jwt_token');
};
