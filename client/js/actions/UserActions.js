// Disable the no-use-before-define eslint rule for this file
// It makes more sense to have the asnyc actions before the non-async ones
/* eslint-disable no-use-before-define */

import {
  USER_CREATE,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAILURE,
  USER_GET,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  USER_GET_CURRENT,
  USER_GET_CURRENT_SUCCESS,
  USER_GET_CURRENT_FAILURE,
  USER_LIST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_UPDATE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_DELETE,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,

} from '../constants/AppConstants';

import { login } from './AppActions';

import request from '../utils/request';

export function userCreate(data, onSuccess) {
  return (dispatch) => {
    dispatch(doUserCreate());
    request(process.env.API_BASE_URL + 'users.json', {
      body: JSON.stringify(data),
      method: 'POST'
    })
      .then(json => dispatch(userCreateSuccess(json)))
      .then(() => dispatch(login(data.email, data.password, onSuccess)))
      .catch((json) => dispatch(userCreateFailure(json)));
  };
}

export function doUserCreate() {
  return {type: USER_CREATE};
}

export function userCreateSuccess(user) {
  return { type: USER_CREATE_SUCCESS, user };
}

export function userCreateFailure(errors) {
  return { type: USER_CREATE_FAILURE, errors };
}

export function userGet(id, onSuccess) {
  return (dispatch) => {
    dispatch(doGetUser(id, onSuccess));
    request(process.env.API_BASE_URL + 'users/' + id + '.json')
      .then(json => dispatch(userGetSuccess(json)))
      .then(onSuccess)
      .catch(() => dispatch(userGetFailure(id)));
  };
}

export function doUserGet(user) {
  return { type: USER_GET, user };
}

export function userGetSuccess(user) {
  return { type: USER_GET_SUCCESS, user };
}

export function userGetFailure(id) {
  return { type: USER_GET_FAILURE, id };
}

export function userGetCurrent(onSuccess) {
  return (dispatch) => {
    dispatch(doUserGetCurrent(onSuccess));
    request(process.env.API_BASE_URL + 'users/current.json')
      .then(user => {
        dispatch((user && user.id) ? userGetCurrentSuccess(user, onSuccess) : userGetCurrentFailure());
      })
      .catch(() => dispatch(userGetCurrentFailure()));
  };
}

export function doUserGetCurrent(onSuccess) {
  return { type: USER_GET_CURRENT, onSuccess };
}

export function userGetCurrentSuccess(user, onSuccess) {
  if (onSuccess) {
    onSuccess();
  };

  return { type: USER_GET_CURRENT_SUCCESS, user };
}

export function userGetCurrentFailure() {
  return { type: USER_GET_CURRENT_FAILURE };
}

export function userList(onSuccess) {
  return (dispatch) => {
    dispatch(doUserList(onSuccess));
    request(process.env.API_BASE_URL + 'users.json')
      .then(json => dispatch(userListSuccess(json)))
      .then(onSuccess)
      .catch(() => dispatch(userListFailure()));
  };
}

export function doUserList(onSuccess) {
  return { type: USER_LIST, onSuccess };
}

export function userListSuccess(users) {
  return { type: USER_LIST_SUCCESS, users };
}

export function userListFailure() {
  return { type: USER_LIST_FAILURE };
}

export function userUpdate(id, data, onSuccess) {
  return (dispatch) => {
    dispatch(doUserUpdate(id, data, onSuccess));
    request(process.env.API_BASE_URL + 'users/' + id + '.json', {
      body: JSON.stringify(data),
      method: 'PUT'
    })
      .then(json => dispatch(userUpdateSuccess(json)))
      .then(onSuccess)
      .catch((json) => dispatch(userUpdateFailure(json)));
  };
}

export function doUserUpdate(id, data, onSuccess) {
  return { type: USER_UPDATE, id, data, onSuccess };
}

export function userUpdateSuccess(user) {
  return { type: USER_UPDATE_SUCCESS, user };
}

export function userUpdateFailure(errors) {
  return { type: USER_UPDATE_FAILURE, errors };
}

export function userDelete(id, onSuccess) {
  return (dispatch) => {
    dispatch(doUserDelete(id, onSuccess));
    request(process.env.API_BASE_URL + 'users/' + id + '.json', {
      method: 'DELETE'
    })
      .then(() => dispatch(userDeleteSuccess(id)))
      .then(onSuccess)
      .catch(() => dispatch(userDeleteFailure(id)));
  };
}

export function doUserDelete(id, onSuccess) {
  return { type: USER_DELETE, id, onSuccess };
}

export function userDeleteSuccess(id) {
  return { type: USER_DELETE_SUCCESS, id };
}

export function userDeleteFailure(id) {
  return { type: USER_DELETE_FAILURE, id };
}