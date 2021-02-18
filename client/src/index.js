import axios from 'axios';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.scss';
import { AUTH_TYPES } from './redux/auth/auth.types';
import { default as reduxStore, default as store } from './redux/store';

toast.configure();

const baseURL = process.env.REACT_APP_API_BASE_URL;

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const decoded = jwt.decode(localStorage.getItem('jwt_token'));
    const date = new Date().getTime();

    if (decoded) {
      if (date >= decoded.exp * 1000) {
        toast.error('Session expired! Login again');
        reduxStore.dispatch({
          type: AUTH_TYPES.LOG_OUT_USER,
        });

        throw new axios.Cancel('Please login again');
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message == 'User no longer exist'
    ) {
      reduxStore.dispatch({
        type: AUTH_TYPES.LOG_OUT_USER,
      });
      toast.error('Your account is deleted!');
    }

    if (
      error.response &&
      error.response.data &&
      error.response.data.message == 'Not authorize'
    ) {
      reduxStore.dispatch({
        type: AUTH_TYPES.LOG_OUT_USER,
      });
      toast.error('You are not authorize! login again');
    }

    if (
      error.response &&
      error.response.data &&
      error.response.data.message == 'Jwt token expired! Login again'
    ) {
      reduxStore.dispatch({
        type: AUTH_TYPES.LOG_OUT_USER,
      });
      toast.error('Jwt token expired! Login again');
    }

    return Promise.reject(error);
  }
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
