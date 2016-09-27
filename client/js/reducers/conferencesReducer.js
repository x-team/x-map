import {
  APP_LOGIN_FAILURE,
  APP_LOGOUT,
  CONFERENCE_LIST_SUCCESS,
  CONFERENCE_LIST_FAILURE,
  CONFERENCE_GET_SUCCESS,
  CONFERENCE_GET_FAILURE,
  CONFERENCE_CREATE_SUCCESS,
  CONFERENCE_UPDATE_SUCCESS,
  CONFERENCE_DELETE_SUCCESS,
  CONFERENCE_UNLINK_USER_SUCCESS
} from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';

function conferencesReducer(conferences = {}, action) {
  Object.freeze(conferences);

  let newConferences;
  switch (action.type) {
    case CONFERENCE_LIST_SUCCESS:
      newConferences = {};
      action.conferences.forEach((conference) => {
        newConferences[conference.id] = conference;
      });
      return newConferences;
    case CONFERENCE_GET_SUCCESS:
    case CONFERENCE_CREATE_SUCCESS:
    case CONFERENCE_UPDATE_SUCCESS:
      return assignToEmpty(conferences, {
        [action.conference.id]: action.conference
      });
    case CONFERENCE_GET_FAILURE:
    case CONFERENCE_DELETE_SUCCESS:
      newConferences = assignToEmpty(conferences);
      delete newConferences[action.id];
      return newConferences;
    case APP_LOGIN_FAILURE:
    case APP_LOGOUT:
    case CONFERENCE_LIST_FAILURE:
      return {};
    case CONFERENCE_UNLINK_USER_SUCCESS:
      newConferences = assignToEmpty(conferences);
      if (newConferences[action.id]) {
        newConferences[action.id].users = newConferences[action.id].users.filter(user => {
          return user.id !== action.userId;
        });
      }
      return newConferences;
    default:
      return conferences;
  }
}

export default conferencesReducer;
