import expect from 'expect';
import teamsReducer, { initialState } from '../../js/reducers/teamsReducer';
import * as constants from '../../js/constants/AppConstants';

const getAction = (type, payload) => {
  return {
    type,
    ...payload
  };
};

describe('teamsReducer', () => {
  const team = { id: 1, name: 'Team 1' };
  const team2 = { id: 2, name: 'Team 2' };

  it('should return initial state on init', () => {
    expect(teamsReducer(undefined, {})).toEqual(initialState);
  });

  it('should return initial state on unknown action', () => {
    expect(teamsReducer(undefined, getAction('UNKNOWN_ACTION'))).toEqual(initialState);
  });

  it('should return an Object<Team> indexed by ID with TEAM_LIST_SUCCESS action', () => {
    const action = getAction(constants.TEAM_LIST_SUCCESS, {
      teams: [team]
    });

    expect(teamsReducer(undefined, action)).toEqual({ 1: team });
  });

  it('should update team info on state when called with TEAM_GET_SUCCESS, TEAM_CREATE_SUCCESS or TEAM_UPDATE_SUCCESS', () => {
    const state = { 1: team, 2: team2 };
    const teamUpdated = { id: 1, name: 'Team Updated' };
    const actionPayload = { team: teamUpdated };
    const actionGetSuccess = getAction(constants.TEAM_GET_SUCCESS, actionPayload);
    const actionCreateSuccess = getAction(constants.TEAM_CREATE_SUCCESS, actionPayload);
    const actionUpdateSuccess = getAction(constants.TEAM_UPDATE_SUCCESS, actionPayload);
    const expected = { 1: teamUpdated, 2: team2 };

    expect(teamsReducer(state, actionGetSuccess)).toEqual(expected);
    expect(Object.keys(teamsReducer(state, actionGetSuccess)).length).toBe(2);

    expect(teamsReducer(state, actionCreateSuccess)).toEqual(expected);
    expect(Object.keys(teamsReducer(state, actionCreateSuccess)).length).toBe(2);

    expect(teamsReducer(state, actionUpdateSuccess)).toEqual(expected);
    expect(Object.keys(teamsReducer(state, actionUpdateSuccess)).length).toBe(2);
  });

  it('should delete team info on state when called with TEAM_GET_FAILURE or TEAM_DELETE_SUCCESS', () => {
    const state = { 1: team, 2: team2 };
    const actionPayload = {id: 1};
    const actionGetFailure = getAction(constants.TEAM_GET_FAILURE, actionPayload);
    const actionDeleteSuccess = getAction(constants.TEAM_DELETE_SUCCESS, actionPayload);
    const expected = { 2: team2 };

    expect(teamsReducer(state, actionGetFailure)).toEqual(expected);
    expect(Object.keys(teamsReducer(state, actionGetFailure)).length).toBe(1);

    expect(teamsReducer(state, actionDeleteSuccess)).toEqual(expected);
    expect(Object.keys(teamsReducer(state, actionDeleteSuccess)).length).toBe(1);
  });

  it('should return an empty object when called for APP_LOGIN_FAILURE, APP_LOGOUT and TEAM_LIST_FAILURE actions', () => {
    const expected = {};

    expect(teamsReducer(undefined, getAction(constants.APP_LOGIN_FAILURE, {}))).toEqual(expected);
    expect(teamsReducer(undefined, getAction(constants.APP_LOGOUT, {}))).toEqual(expected);
    expect(teamsReducer(undefined, getAction(constants.TEAM_LIST_FAILURE, {}))).toEqual(expected);
  });

  it('should unlink a given User ID from teams users object on TEAM_UNLINK_USER_SUCCESS action', () => {
    const state = {
      1: {
        ...team,
        users: [{
          id: 2,
          name: 'User 1'
        }]
      }
    };
    const payload = {
      id: 1,
      userId: 2
    };
    const expected = {
      1: {
        ...team,
        users: []
      }
    };
    const result = getAction(constants.TEAM_UNLINK_USER_SUCCESS, payload);

    expect(teamsReducer(state, result)).toEqual(expected);
    expect(teamsReducer(state, result)[1].users.length).toBe(0);
  });
});
