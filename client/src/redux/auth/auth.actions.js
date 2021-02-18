import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AUTH_TYPES } from './auth.types';
import { logOut, setAuthUser } from './auth.utils';


toast.configure();

export const signUpUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_TYPES.AUTH_START });
    const result = await axios.post('users/register', data);

    setAuthUser(result.data.token, dispatch, result.data);
    toast.success('Created account successfully');
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Something went wrong! Try again');
    }
  }
};

export const singInUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_TYPES.AUTH_START });

    const result = await axios.post('/users/login', data);

    setAuthUser(result.data.token, dispatch, result.data);
  } catch (error) {
    if (error.response.data.message) {
      return toast.error(error.response.data.message);
    } else {
      return toast.error('Something went wrong! Try again');
    }
  }
};

export const logOutUser = () => (dispatch) => {
  logOut(dispatch);
};

export const fetchUserData = () => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_TYPES.FETCH_USER_DATA_START,
    });

    const result = await axios.get('/users/single');

    dispatch({
      type: AUTH_TYPES.FETCH_USER_DATA,
      payload: result.data.user,
    });
  } catch (error) {
    dispatch({ type: AUTH_TYPES.FETCH_USER_DATA_END });
    toast.error('Something is wrong');
  }
};

export const updateUserData = (data) => async (dispatch) => {
  dispatch({
    type: AUTH_TYPES.FETCH_USER_DATA,
    payload: data,
  });
};

export const fetchBookmarks = () => async (dispatch) => {
  try {
    const result = await axios.get('/bookmark');

    dispatch({
      type: AUTH_TYPES.FETCH_BOOKMARKS,
      payload: result.data,
    });
  } catch (error) {
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Something went wrong! Try again');
    }
  }
};

export const updateBookmarks = (data) => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_TYPES.FETCH_BOOKMARKS,
      payload: data,
    });
  } catch (error) {
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Something went wrong! Try again');
    }
  }
};
