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
  USER_DELETE_FAILURE
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
      .then(user => dispatch(userCreateSuccess(user)))
      .then(() => dispatch(login(data.email, data.password, onSuccess)))
      .catch((errors) => dispatch(userCreateFailure(data, errors)));
  };
}

function doUserCreate() {
  return {type: USER_CREATE};
}

export function userCreateSuccess(user) {
  return {type: USER_CREATE_SUCCESS, user};
}

export function userCreateFailure(data, errors) {
  return {type: USER_CREATE_FAILURE, data, errors};
}

export function userGet(id, onSuccess) {
  return (dispatch) => {
    dispatch(doUserGet(id));
    request(process.env.API_BASE_URL + 'users/' + id + '.json')
      .then(user => dispatch(userGetSuccess(user)))
      .then(onSuccess)
      .catch((errors) => dispatch(userGetFailure(id, errors)));
  };
}

function doUserGet(id) {
  return {type: USER_GET, id};
}

export function userGetSuccess(user) {
  return {type: USER_GET_SUCCESS, user};
}

export function userGetFailure(id, errors) {
  return {type: USER_GET_FAILURE, id, errors};
}

export function userGetCurrent(onSuccess, onFailure) {
  return (dispatch) => {
    dispatch(doUserGetCurrent());
    request(process.env.API_BASE_URL + 'users/current.json')
      .then(user => {
        dispatch((user && user.id) ? userGetCurrentSuccess(user, onSuccess) : userGetCurrentFailure(onFailure));
      })
      .catch((errors) => dispatch(userGetCurrentFailure(onFailure, errors)));
  };
}

function doUserGetCurrent() {
  return {type: USER_GET_CURRENT};
}

export function userGetCurrentSuccess(user, onSuccess) {
  if (onSuccess) {
    onSuccess();
  }

  return {type: USER_GET_CURRENT_SUCCESS, user};
}

export function userGetCurrentFailure(errors, onFailure) {
  if (onFailure) {
    onFailure();
  }

  return {type: USER_GET_CURRENT_FAILURE, errors};
}

export function userList(onSuccess) {
  return (dispatch) => {
    dispatch(doUserList());
    request(process.env.API_BASE_URL + 'users.json')
      .then(users => dispatch(userListSuccess(users)))
      .then(onSuccess)
      .catch((errors) => dispatch(userListFailure(errors)));
  };
}

function doUserList() {
  return {type: USER_LIST};
}

export function userListSuccess(users) {
  return {type: USER_LIST_SUCCESS, users};
}

export function userListFailure(errors) {
  return {type: USER_LIST_FAILURE, errors};
}

export function userUpdate(data, onSuccess) {
  return (dispatch) => {
    dispatch(doUserUpdate(data));
    request(process.env.API_BASE_URL + 'users/' + data.id + '.json', {
      body: JSON.stringify(data),
      method: 'PUT'
    })
      .then(user => dispatch(userUpdateSuccess(user)))
      .then(onSuccess)
      .catch((errors) => dispatch(userUpdateFailure(errors)));
  };
}

function doUserUpdate(data) {
  return {type: USER_UPDATE, data};
}

export function userUpdateSuccess(user) {
  return {type: USER_UPDATE_SUCCESS, user};
}

export function userUpdateFailure(errors) {
  return {type: USER_UPDATE_FAILURE, errors};
}

export function userDelete(id, onSuccess) {
  return (dispatch) => {
    dispatch(doUserDelete(id));
    request(process.env.API_BASE_URL + 'users/' + id + '.json', {
      method: 'DELETE'
    })
      .then(() => dispatch(userDeleteSuccess(id)))
      .then(onSuccess)
      .catch((errors) => dispatch(userDeleteFailure(id, errors)));
  };
}

function doUserDelete(id) {
  return {type: USER_DELETE, id};
}

export function userDeleteSuccess(id) {
  return {type: USER_DELETE_SUCCESS, id};
}

export function userDeleteFailure(id, errors) {
  return {type: USER_DELETE_FAILURE, id, errors};
}
