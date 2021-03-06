import {
  APP_LOGIN_FAILURE,
  APP_LOGOUT,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS,
  USER_GRANT_ADMIN_SUCCESS,
  USER_REVOKE_ADMIN_SUCCESS,
  USER_SET_VISIBILITY,
  TEAM_UNLINK_USER_SUCCESS
} from '../constants/AppConstants';

import assignToEmpty from '../utils/assign';
import { sortTeamsByName } from '../utils/common';

export const initialState = {
  visible: true
};

function usersReducer(users = initialState, action) {
  Object.freeze(users);

  let newUsers;
  switch (action.type) {
    case USER_LIST_SUCCESS:
      newUsers = {};
      action.users.forEach((user) => {
        processUser(user);
        newUsers[user.id] = user;
      });
      return {
        ...users,
        ...newUsers
      };
    case USER_GET_SUCCESS:
    case USER_UPDATE_SUCCESS:
      processUser(action.user);
      return {
        ...users,
        [action.user.id]: action.user
      };
    case USER_GRANT_ADMIN_SUCCESS:
      newUsers = assignToEmpty(users);
      newUsers[action.id].isAdmin = true;
      return {
        ...users,
        ...newUsers
      };
    case USER_REVOKE_ADMIN_SUCCESS:
      newUsers = assignToEmpty(users);
      newUsers[action.id].isAdmin = false;
      return {
        ...users,
        ...newUsers
      };
    case USER_GET_FAILURE:
    case USER_DELETE_SUCCESS:
      newUsers = assignToEmpty(users);
      delete newUsers[action.id];
      return {
        ...users,
        ...newUsers
      };
    case APP_LOGIN_FAILURE:
    case APP_LOGOUT:
    case USER_LIST_FAILURE:
      return initialState;
    case TEAM_UNLINK_USER_SUCCESS:
      newUsers = assignToEmpty(users);
      if (newUsers[action.userId]) {
        newUsers[action.userId].teams = newUsers[action.userId].teams.filter(team => {
          return team.id !== action.id;
        });
      }
      return {
        ...users,
        ...newUsers
      };
    case USER_SET_VISIBILITY: {
      return {
        ...users,
        visible: action.visible
      };
    }
    default:
      return users;
  }
}

function processUser(user) {
  user.teams.sort(sortTeamsByName);
}

export default usersReducer;
