import axios from 'axios';
import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  AUTH_ERROR,
  DASHBOARD_GET_DATA,
} from './types';

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:5000/users/signup', data);
      console.log(res);

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email is alredy in use',
      });
      console.error('err', err);
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem('JWT_TOKEN');
    axios.defaults.headers.common['Authorization'] = '';

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: '',
    });
  };
};

export const signIn = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:5000/users/signin', data);
      console.log(res);

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token,
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Wrong credentials',
      });
      console.error('err', err);
    }
  };
};

export const getSecret = () => {
  return async (dispatch) => {
    try {
      const res = await axios('http://localhost:5000/users/secret');

      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data.secret,
      });
    } catch (error) {
      console.log('err', error);
    }
  };
};
