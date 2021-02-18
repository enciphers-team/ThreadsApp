import { AUTH_TYPES } from './auth.types';

const INITIAL_STATE = {
  user: null,
  bookmarks: [],
  error: null,
  token: null,
  isAuth: false,
  loginError: null,
  registerError: {},
  isLoading: false,
  fetchUserLoading: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_TYPES.FETCH_USER_DATA_START:
      return {
        ...state,
        fetchUserLoading: true,
      };

    case AUTH_TYPES.FETCH_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload,
      };

    case AUTH_TYPES.FETCH_USER_DATA_END:
      return {
        ...state,
        fetchUserLoading: false,
      };

    case AUTH_TYPES.SET_AUTH_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuth: true,
        loginError: null,
        isLoading: false,
      };

    case AUTH_TYPES.LOG_OUT_USER:
      window.localStorage.removeItem('jwt_token');
      return {
        ...state,
        user: null,
        token: null,
        isAuth: false,
      };

    case AUTH_TYPES.FETCH_USER_DATA:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        fetchUserLoading: false,
      };

    case AUTH_TYPES.SET_AUTH_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload,
        isLoading: false,
      };

    case AUTH_TYPES.SET_AUTH_REGISTER_ERROR:
      return {
        ...state,
        registerError: action.payload,
        isLoading: false,
      };

    case AUTH_TYPES.AUTH_START:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};

export default authReducer;
