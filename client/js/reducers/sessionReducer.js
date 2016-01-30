import {
  APP_LOGIN_SUCCESS,
  APP_LOGIN_FAILURE,
  APP_LOGOUT_SUCCESS,
  APP_LOGOUT_FAILURE,
  USER_GET_CURRENT_SUCCESS,
  USER_GET_CURRENT_FAILURE,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  TEAM_LIST_SUCCESS,
  TEAM_LIST_FAILURE,
  USER_ACTIVE_CHANGED,
  USER_UPDATES_LOCATION,
  USER_UPDATED_LOCATION,
  USER_SELECTED_LOCATION,
  MAP_MODE_SELECT,
  MAP_MODE_SHOW
} from '../constants/AppConstants';

import assignToEmpty from './../utils/assign';

const initialState = {
  activeUserIds: [],
  mapMode: MAP_MODE_SHOW
};

function sessionReducer(session = initialState, action) {
  Object.freeze(session);

  switch (action.type) {
    case APP_LOGIN_SUCCESS:
    case USER_GET_CURRENT_SUCCESS:
      return assignToEmpty(session, {
        currentUserId: action.user.id,
        isAdmin: action.user.isAdmin,
        currentUserLoaded: true
      });
    case USER_GET_CURRENT_FAILURE:
    case APP_LOGOUT_SUCCESS:
      return assignToEmpty(session, {
        currentUserId: null,
        isAdmin: false,
        currentUserLoaded: true
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
        isAdmin: false,
        currentUserLoaded: true
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
    case APP_LOGOUT_FAILURE:
    default:
      return session;
  }
}

export default sessionReducer;
