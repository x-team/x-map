import {
  APP_LOGIN_SUCCESS,
  APP_LOGIN_FAILURE,
  APP_LOGOUT,
  APP_GOOGLE_SIGNED_IN,
  APP_GOOGLE_SIGNED_OUT,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  TEAM_LIST_SUCCESS,
  TEAM_LIST_FAILURE,
  USER_ACTIVE_CHANGED,
  USER_UPDATES_LOCATION,
  USER_UPDATED_LOCATION,
  USER_SELECTED_LOCATION,
  USER_UPDATE_SUCCESS,
  MAP_MODE_SELECT,
  MAP_MODE_SHOW
} from '../constants/AppConstants';

import assignToEmpty from './../utils/assign';

const initialState = {
  activeUserIds: [],
  mapMode: MAP_MODE_SHOW,
  isSignedIn: true,
  currentUserId: null
};

function sessionReducer(session = initialState, action) {
  Object.freeze(session);

  switch (action.type) {
    case APP_LOGIN_SUCCESS:
      return assignToEmpty(session, {
        currentUserId: action.user.id,
        isAdmin: action.user.isAdmin,
        isProfileFilled: !!action.user.firstName && !!action.user.lastName && !!action.user.slackId && !!action.user.email
      });
    case APP_LOGOUT:
      return assignToEmpty(session, {
        currentUserId: null,
        isAdmin: false,
        usersLoaded: false,
        teamsLoaded: false
      });
    case APP_GOOGLE_SIGNED_IN:
      return assignToEmpty(session, {
        isSignedIn: true
      });
    case APP_GOOGLE_SIGNED_OUT:
      return assignToEmpty(session, {
        isSignedIn: false,
        usersLoaded: false,
        teamsLoaded: false
      });
    case USER_LIST_SUCCESS:
    case USER_LIST_FAILURE:
      return assignToEmpty(session, {
        usersLoaded: true
      });
    case TEAM_LIST_SUCCESS:
    case TEAM_LIST_FAILURE:
      return assignToEmpty(session, {
        teamsLoaded: true
      });
    case APP_LOGIN_FAILURE:
      return assignToEmpty(session, {
        currentUserId: null,
        isAdmin: false
      });
    case USER_ACTIVE_CHANGED:
      return assignToEmpty(session, {
        activeUserIds: action.ids
      });
    case USER_UPDATES_LOCATION:
      const changeset = {
        mapMode: MAP_MODE_SELECT
      };

      if (typeof action.lat === 'number' && typeof action.lng === 'number') {
        changeset.currentLocation = {
          lat: action.lat,
          lng: action.lng
        };
      } else {
        changeset.currentLocation = null;
      }

      return assignToEmpty(session, changeset);
    case USER_SELECTED_LOCATION:
      return assignToEmpty(session, {
        currentLocation: {
          lat: action.lat,
          lng: action.lng
        }
      });
    case USER_UPDATED_LOCATION:
      return assignToEmpty(session, {
        mapMode: MAP_MODE_SHOW
      });
    case USER_UPDATE_SUCCESS:
      if (action.user.id === session.currentUserId) {
        return assignToEmpty(session, {
          isProfileFilled: !!action.user.firstName && !!action.user.lastName && !!action.user.slackId && !!action.user.email
        });
      }
      return session;
    default:
      return session;
  }
}

export default sessionReducer;
