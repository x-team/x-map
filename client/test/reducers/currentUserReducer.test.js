import expect from 'expect';
import currentUserReducer from '../../js/reducers/currentUserReducer';
import * as AppConstants from '../../js/constants/AppConstants';

// Test Reducer
describe('currentUserReducer', () => {

  it('should return empty object as the initial state', () => {
    expect(currentUserReducer(undefined, {})).toEqual({});
  });

  it('should set current user on APP_LOGIN_SUCCESS action', () => {
    const user = {id: 42};
    expect(currentUserReducer({}, {type: AppConstants.APP_LOGIN_SUCCESS, user})).toEqual(user);
  });

  it('should remove current user on APP_LOGIN_FAILURE action', () => {
    const user = {id: 42};
    expect(currentUserReducer(user, {type: AppConstants.APP_LOGIN_FAILURE})).toEqual({});
  });

  it('should remove current user on APP_LOGOUT_SUCCESS action', () => {
    const user = {id: 42};
    expect(currentUserReducer(user, {type: AppConstants.APP_LOGOUT_SUCCESS})).toEqual({});
  });

  it('should keep current user on APP_LOGOUT_FAILURE action', () => {
    const user = {id: 42};
    expect(currentUserReducer(user, {type: AppConstants.APP_LOGOUT_FAILURE})).toEqual(user);
  });

});
