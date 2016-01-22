import {
  APP_ROUTE_CHANGED,
  APP_LOGIN_FAILURE,
  USER_CREATE_FAILURE
} from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';

function errorsReducer(errors = {}, action) {
  Object.freeze(errors);

  switch (action.type) {
    case APP_ROUTE_CHANGED:
      return {};
    case APP_LOGIN_FAILURE:
      return assignToEmpty(errors, {
        appLogin: action.errors
      });
    case USER_CREATE_FAILURE:
      return assignToEmpty(errors, {
        userCreate: action.errors
      });
    default:
      return errors;
  }
}

export default errorsReducer;
