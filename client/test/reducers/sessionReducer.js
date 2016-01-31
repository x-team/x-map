import expect from 'expect';
import sessionReducer from '../../js/reducers/sessionReducer';
import * as AppConstants from '../../js/constants/AppConstants';

const initialState = {
  activeUserIds: [],
  mapMode: AppConstants.MAP_MODE_SHOW
};

describe('sessionReducer', () => {
  it('should return initial state on init', () => {
    expect(sessionReducer(undefined, {})).toEqual(initialState);
  });

  it('should set current user on APP_LOGIN_SUCCESS action', () => {
    const user = { id: 42, isAdmin: true };
    const expected = { currentUserId: 42, isAdmin: true, currentUserLoaded: true };
    expect(sessionReducer({}, {type: AppConstants.APP_LOGIN_SUCCESS, user})).toEqual(expected);
  });

  it('should remove current user on APP_LOGIN_FAILURE action', () => {
    const state = { currentUserId: 42, isAdmin: false, currentUserLoaded: true };
    const expected = { currentUserId: null, isAdmin: false, currentUserLoaded: true };
    expect(sessionReducer(state, {type: AppConstants.APP_LOGIN_FAILURE})).toEqual(expected);
  });

  it('should remove current user on APP_LOGOUT action', () => {
    const state = { currentUserId: 42, isAdmin: false, currentUserLoaded: true };
    const expected = { currentUserId: null, isAdmin: false, currentUserLoaded: true };
    expect(sessionReducer(state, {type: AppConstants.APP_LOGOUT})).toEqual(expected);
  });
});
