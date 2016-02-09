import {
  APP_LOGIN_FAILURE,
  APP_LOGOUT,
  TEAM_LIST_SUCCESS,
  TEAM_LIST_FAILURE,
  TEAM_GET_SUCCESS,
  TEAM_GET_FAILURE,
  TEAM_CREATE_SUCCESS,
  TEAM_UPDATE_SUCCESS,
  TEAM_DELETE_SUCCESS,
  TEAM_LINK_USER_SUCCESS,
  TEAM_UNLINK_USER_SUCCESS
} from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';

function teamsReducer(teams = {}, action) {
  Object.freeze(teams);

  let newTeams;
  switch (action.type) {
    case TEAM_LIST_SUCCESS:
      newTeams = {};
      action.teams.forEach((team) => {
        newTeams[team.id] = team;
      });
      return newTeams;
    case TEAM_GET_SUCCESS:
    case TEAM_CREATE_SUCCESS:
    case TEAM_UPDATE_SUCCESS:
      return assignToEmpty(teams, {
        [action.team.id]: action.team
      });
    case TEAM_GET_FAILURE:
    case TEAM_DELETE_SUCCESS:
      newTeams = assignToEmpty(teams);
      delete newTeams[action.id];
      return newTeams;
    case APP_LOGIN_FAILURE:
    case APP_LOGOUT:
    case TEAM_LIST_FAILURE:
      return {};
    case TEAM_LINK_USER_SUCCESS:
      return teams;
    case TEAM_UNLINK_USER_SUCCESS:
      newTeams = assignToEmpty(teams);
      if (newTeams[action.id]) {
        newTeams[action.id].users = newTeams[action.id].users.filter(user => {
          return user.id !== action.userId;
        });
      }
      return newTeams;
    default:
      return teams;
  }
}

export default teamsReducer;
