import {
  CONFERENCE_CREATE,
  CONFERENCE_CREATE_SUCCESS,
  CONFERENCE_CREATE_FAILURE,
  CONFERENCE_GET,
  CONFERENCE_GET_SUCCESS,
  CONFERENCE_GET_FAILURE,
  CONFERENCE_LIST,
  CONFERENCE_LIST_SUCCESS,
  CONFERENCE_LIST_FAILURE,
  CONFERENCE_UPDATE,
  CONFERENCE_UPDATE_SUCCESS,
  CONFERENCE_UPDATE_FAILURE,
  CONFERENCE_DELETE,
  CONFERENCE_DELETE_SUCCESS,
  CONFERENCE_DELETE_FAILURE,
  CONFERENCE_LINK_USER,
  CONFERENCE_LINK_USER_SUCCESS,
  CONFERENCE_LINK_USER_FAILURE,
  CONFERENCE_UNLINK_USER,
  CONFERENCE_UNLINK_USER_SUCCESS,
  CONFERENCE_UNLINK_USER_FAILURE,
  CONFERENCE_ACTIVE_CHANGED
} from '../constants/AppConstants';

import { userList } from '../actions/UserActions';

import request from '../utils/request';

export function conferenceCreate(data, onSuccess) {
  data.type = 'conference';

  return (dispatch) => {
    dispatch(doConferenceCreate());
    request(process.env.API_BASE_URL + 'events.json', {
      body: JSON.stringify(data),
      method: 'POST'
    })
      .then(conference => dispatch(conferenceCreateSuccess(conference)))
      .then(onSuccess)
      .catch((errors) => dispatch(conferenceCreateFailure(data, errors)));
  };
}

function doConferenceCreate() {
  return {type: CONFERENCE_CREATE};
}

export function conferenceCreateSuccess(conference) {
  return {type: CONFERENCE_CREATE_SUCCESS, conference};
}

export function conferenceCreateFailure(data, errors) {
  return {type: CONFERENCE_CREATE_FAILURE, data, errors};
}

export function conferenceGet(id, onSuccess) {
  return (dispatch) => {
    dispatch(doConferenceGet(id));
    request(process.env.API_BASE_URL + 'events/' + id + '.json')
      .then(conference => dispatch(conferenceGetSuccess(conference)))
      .then(onSuccess)
      .catch((errors) => dispatch(conferenceGetFailure(id, errors)));
  };
}

function doConferenceGet(conference) {
  return {type: CONFERENCE_GET, conference};
}

export function conferenceGetSuccess(conference) {
  return {type: CONFERENCE_GET_SUCCESS, conference};
}

export function conferenceGetFailure(id, errors) {
  return {type: CONFERENCE_GET_FAILURE, id, errors};
}

export function conferenceList(onSuccess) {
  return (dispatch) => {
    dispatch(doConferenceList());
    request(process.env.API_BASE_URL + 'events.json')
      .then(conferences => dispatch(conferenceListSuccess(conferences)))
      .then(onSuccess)
      .catch((errors) => dispatch(conferenceListFailure(errors)));
  };
}

function doConferenceList() {
  return {type: CONFERENCE_LIST};
}

export function conferenceListSuccess(conferences) {
  return {type: CONFERENCE_LIST_SUCCESS, conferences};
}

export function conferenceListFailure(errors) {
  return {type: CONFERENCE_LIST_FAILURE, errors};
}

export function conferenceUpdate(data, onSuccess) {
  return (dispatch) => {
    dispatch(doConferenceUpdate(data));
    request(process.env.API_BASE_URL + 'events/' + data.id + '.json', {
      body: JSON.stringify(data),
      method: 'PUT'
    })
      .then(conference => dispatch(conferenceUpdateSuccess(conference)))
      .then(onSuccess)
      .catch((errors) => dispatch(conferenceUpdateFailure(data, errors)));
  };
}

function doConferenceUpdate(data) {
  return {type: CONFERENCE_UPDATE, data};
}

export function conferenceUpdateSuccess(conference) {
  return {type: CONFERENCE_UPDATE_SUCCESS, conference};
}

export function conferenceUpdateFailure(data, errors) {
  return {type: CONFERENCE_UPDATE_FAILURE, data, errors};
}

export function conferenceDelete(id, onSuccess) {
  return (dispatch) => {
    dispatch(doConferenceDelete(id));
    request(process.env.API_BASE_URL + 'events/' + id + '.json', {
      method: 'DELETE'
    })
      .then(onSuccess)
      .then(() => dispatch(conferenceDeleteSuccess(id)))
      .catch((errors) => dispatch(conferenceDeleteFailure(id, errors)));
  };
}

function doConferenceDelete(id) {
  return {type: CONFERENCE_DELETE, id};
}

export function conferenceDeleteSuccess(id) {
  return {type: CONFERENCE_DELETE_SUCCESS, id};
}

export function conferenceDeleteFailure(id, errors) {
  return {type: CONFERENCE_DELETE_FAILURE, id, errors};
}

export function conferenceLinkUser(id, userId, onSuccess) {
  return (dispatch) => {
    dispatch(doConferenceLinkUser(id, userId));
    request(process.env.API_BASE_URL + 'events/' + id + '/users/' + userId + '.json', {
      method: 'PUT'
    })
      .then(() => dispatch(conferenceLinkUserSuccess(id, userId)))
      .then(() => dispatch(conferenceList()))
      .then(() => dispatch(userList()))
      .then(onSuccess)
      .catch((errors) => dispatch(conferenceLinkUserFailure(id, userId, errors)));
  };
}

function doConferenceLinkUser(id, userId) {
  return {type: CONFERENCE_LINK_USER, id, userId};
}

export function conferenceLinkUserSuccess(id, userId) {
  return {type: CONFERENCE_LINK_USER_SUCCESS, id, userId};
}

export function conferenceLinkUserFailure(id, userId, errors) {
  return {type: CONFERENCE_LINK_USER_FAILURE, id, userId, errors};
}

export function conferenceUnlinkUser(id, userId, onSuccess) {
  return (dispatch) => {
    dispatch(doConferenceUnlinkUser(id, userId));
    request(process.env.API_BASE_URL + 'events/' + id + '/users/' + userId + '.json', {
      method: 'DELETE'
    })
      .then(() => dispatch(conferenceUnlinkUserSuccess(id, userId)))
      .then(onSuccess)
      .catch((errors) => dispatch(conferenceUnlinkUserFailure(id, userId, errors)));
  };
}

function doConferenceUnlinkUser(id, userId) {
  return {type: CONFERENCE_UNLINK_USER, id, userId};
}

export function conferenceUnlinkUserSuccess(id, userId) {
  return {type: CONFERENCE_UNLINK_USER_SUCCESS, id, userId};
}

export function conferenceUnlinkUserFailure(id, userId, errors) {
  return {type: CONFERENCE_UNLINK_USER_FAILURE, id, userId, errors};
}

export function conferenceActiveChanged(ids) {
  return {type: CONFERENCE_ACTIVE_CHANGED, ids};
}
