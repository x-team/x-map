import {
  APP_ROUTE_CHANGED,
  APP_LOGIN,
  APP_LOGIN_SUCCESS,
  APP_LOGIN_FAILURE,
  APP_LOGOUT,
  APP_GOOGLE_SIGNED_IN,
  APP_GOOGLE_SIGNED_OUT
} from '../constants/AppConstants';

import request from '../utils/request';
import getGoogleApiClient from 'google-client-api';

export function routeChanged() {
  return {type: APP_ROUTE_CHANGED};
}

export function authenticate(onSuccess, onFailure) {
  return (dispatch) => {
    getGoogleApiClient((gapi) => {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.currentUser.listen(googleUser => {
        if (googleUser.isSignedIn()) {
          dispatch(googleSignedIn());
          dispatch(login(googleUser.getAuthResponse().id_token, onSuccess));
        } else {
          dispatch(googleSignedOut());
          dispatch(logout(onFailure));
        }
      });

      if (auth2.isSignedIn.get()) {
        auth2.signIn();
      }
    });
  };
}

export function login(token, onSuccess) {
  return (dispatch) => {
    dispatch(doLogin(token));
    request(process.env.API_BASE_URL + 'logins.json', {
      body: JSON.stringify({token}),
      method: 'POST'
    })
      .then(json => dispatch(loginSuccess(json.user, json.token)))
      .then(onSuccess)
      .catch((errors) => {
        dispatch(loginFailure(errors));
        dispatch(logout());
      });
  };
}

function doLogin(token) {
  return {type: APP_LOGIN, token};
}

export function loginSuccess(user, token) {
  window.token = token;
  return (dispatch) => {
    dispatch({type: APP_LOGIN_SUCCESS, user});
  };
}

export function loginFailure(errors) {
  return {type: APP_LOGIN_FAILURE, errors};
}

function googleSignedIn() {
  return {type: APP_GOOGLE_SIGNED_IN};
}

function googleSignedOut() {
  return {type: APP_GOOGLE_SIGNED_OUT};
}

export function logout(onSuccess) {
  return (dispatch) => {
    getGoogleApiClient((gapi) => {
      gapi.auth2.getAuthInstance().signOut();
      if (onSuccess) {
        onSuccess();
      }

      delete window.token;
      dispatch(logoutSuccess());
    });
  };
}

export function logoutSuccess() {
  return {type: APP_LOGOUT};
}
