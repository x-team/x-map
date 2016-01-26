import {
  APP_LOGOUT_SUCCESS,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS
} from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';

function usersReducer(users = {}, action) {
  Object.freeze(users);

  switch (action.type) {
    case USER_LIST_SUCCESS:
      let newUsers = {};
      action.users.forEach((user) => {
        newUsers[user.id] = user
      });
      return newUsers;
    case USER_GET_SUCCESS:
    case USER_UPDATE_SUCCESS:
      return assignToEmpty(users, {
        [action.user.id]: action.user
      });
    case USER_GET_FAILURE:
    case USER_DELETE_SUCCESS:
      return assignToEmpty(users, {
        [action.user.id]: undefined
      });
    case APP_LOGOUT_SUCCESS:
    case USER_LIST_FAILURE:
      return {};
    default:
      return users;
  }
}

export default usersReducer;
