// Disable the no-use-before-define eslint rule for this file
// It makes more sense to have the asnyc actions before the non-async ones
/* eslint-disable no-use-before-define */

import {
  USER_CREATE,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAILURE,
  USER_GET_CURRENT,
  USER_GET_CURRENT_SUCCESS,
  USER_GET_CURRENT_FAILURE
} from '../constants/AppConstants';

import { login } from './AppActions';

import request from '../utils/request';

export function userCreate(email, password, onSuccess) {
  return (dispatch) => {
    request(process.env.API_BASE_URL + 'users.json', {
      body: JSON.stringify({ email, password, username: email }),
      method: 'POST',
      credentials: 'include',
      mode: 'cors-with-forced-preflight',
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    })
      .then(json => dispatch(userCreateSuccess(json)))
      .then(() => dispatch(login(email, password, onSuccess)))
      .catch((json) => dispatch(userCreateFailure(json)));
  };
}

export function userCreateSuccess(user) {
  return { type: USER_CREATE_SUCCESS, user };
}

export function userCreateFailure(errors) {
  return { type: USER_CREATE_FAILURE, errors };
}

export function userGetCurrent(onSuccess) {
  return (dispatch) => {
    request(process.env.API_BASE_URL + 'users/current.json', {
      credentials: 'include',
      mode: 'cors-with-forced-preflight',
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    })
      .then(json => dispatch(userGetCurrentSuccess(json)))
      .then(onSuccess)
      .catch((json) => dispatch(userGetCurrentFailure(json)));
  };
}

export function userGetCurrentSuccess(user) {
  return { type: USER_GET_CURRENT_SUCCESS, user };
}

export function userGetCurrentFailure() {
  return { type: USER_GET_CURRENT_FAILURE };
}