// Disable the no-use-before-define eslint rule for this file
// It makes more sense to have the asnyc actions before the non-async ones
/* eslint-disable no-use-before-define */

import {
  APP_ROUTE_CHANGED,
  APP_LOGIN,
  APP_LOGIN_SUCCESS,
  APP_LOGIN_FAILURE,
  APP_LOGOUT,
  APP_LOGOUT_SUCCESS,
  APP_LOGOUT_FAILURE
} from '../constants/AppConstants';

import request from '../utils/request';

export function routeChanged() {
  return { type: APP_ROUTE_CHANGED };
}

export function login(email, password, onSuccess) {
  return (dispatch) => {
    request(process.env.API_BASE_URL + 'logins.json', {
      body: JSON.stringify({email, password}),
      method: 'POST'
    })
      .then(json => dispatch(loginSuccess(json)))
      .then(onSuccess)
      .catch((json) => dispatch(loginFailure(json)));
  };
}

export function loginSuccess(user) {
  return {type: APP_LOGIN_SUCCESS, user};
}

export function loginFailure(errors) {
  return {type: APP_LOGIN_FAILURE, errors};
}

export function logout(onSuccess) {
  console.log(onSuccess);
  return (dispatch) => {
    request(process.env.API_BASE_URL + 'logouts.json', {
      method: 'POST'
    })
      .then(() => dispatch(logoutSuccess()))
      .then(onSuccess)
      .catch(() => dispatch(logoutFailure()));
  };
}

export function logoutSuccess() {
  return {type: APP_LOGOUT_SUCCESS};
}

export function logoutFailure() {
  return {type: APP_LOGOUT_FAILURE};
}