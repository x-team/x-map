import {
  USER_GET,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  USER_LIST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_UPDATE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_DELETE,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_GRANT_ADMIN,
  USER_GRANT_ADMIN_SUCCESS,
  USER_GRANT_ADMIN_FAILURE,
  USER_REVOKE_ADMIN,
  USER_REVOKE_ADMIN_SUCCESS,
  USER_REVOKE_ADMIN_FAILURE,
  USER_ACTIVE_CHANGED,
  USER_UPDATES_LOCATION,
  USER_UPDATED_LOCATION,
  USER_SELECTED_LOCATION,
  USER_SET_VISIBILITY
} from '../constants/AppConstants';

import request from '../utils/request';

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

export function setUsersVisibility(visible) {
  return {
    type: USER_SET_VISIBILITY,
    visible
  };
}

export function userGetSuccess(user) {
  return {type: USER_GET_SUCCESS, user};
}

export function userGetFailure(id, errors) {
  return {type: USER_GET_FAILURE, id, errors};
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

export function userUpdateFailure(data, errors) {
  return {type: USER_UPDATE_FAILURE, data, errors};
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

export function userGrantAdmin(id, onSuccess) {
  return (dispatch) => {
    dispatch(doUserGrantAdmin(id));
    request(process.env.API_BASE_URL + 'users/' + id + '/admin.json', {
      method: 'PUT'
    })
      .then(() => dispatch(userGrantAdminSuccess(id)))
      .then(onSuccess)
      .catch((errors) => dispatch(userGrantAdminFailure(id, errors)));
  };
}

function doUserGrantAdmin(id) {
  return {type: USER_GRANT_ADMIN, id};
}

export function userGrantAdminSuccess(id) {
  return {type: USER_GRANT_ADMIN_SUCCESS, id};
}

export function userGrantAdminFailure(id, errors) {
  return {type: USER_GRANT_ADMIN_FAILURE, id, errors};
}

export function userRevokeAdmin(id, onSuccess) {
  return (dispatch) => {
    dispatch(doUserRevokeAdmin(id));
    request(process.env.API_BASE_URL + 'users/' + id + '/admin.json', {
      method: 'DELETE'
    })
      .then(() => dispatch(userRevokeAdminSuccess(id)))
      .then(onSuccess)
      .catch((errors) => dispatch(userRevokeAdminFailure(id, errors)));
  };
}

function doUserRevokeAdmin(id) {
  return {type: USER_REVOKE_ADMIN, id};
}

export function userRevokeAdminSuccess(id) {
  return {type: USER_REVOKE_ADMIN_SUCCESS, id};
}

export function userRevokeAdminFailure(id, errors) {
  return {type: USER_REVOKE_ADMIN_FAILURE, id, errors};
}

export function userActiveChanged(ids) {
  return {type: USER_ACTIVE_CHANGED, ids};
}

export function userUpdatesLocation(lat, lng) {
  return {type: USER_UPDATES_LOCATION, lat, lng};
}

export function userUpdatedLocation(lat, lng) {
  return {type: USER_UPDATED_LOCATION, lat, lng};
}

export function userSelectedLocation(lat, lng) {
  return {type: USER_SELECTED_LOCATION, lat, lng};
}
