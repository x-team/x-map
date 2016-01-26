import {
  APP_ROUTE_CHANGED,
  APP_LOGIN,
  APP_LOGIN_FAILURE,
  APP_LOGOUT_SUCCESS,
  USER_CREATE,
  USER_CREATE_FAILURE,
  USER_UPDATE,
  USER_UPDATE_FAILURE
} from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';

function errorsReducer(errors = {}, action) {
  Object.freeze(errors);

  switch (action.type) {
    // clear errors when user leaves current page
    case APP_ROUTE_CHANGED:
      return {};
    case APP_LOGIN:
      return assignToEmpty(errors, {
        appLogin: {}
      });
    case APP_LOGIN_FAILURE:
      return assignToEmpty(errors, {
        appLogin: parseErrors(action.errors)
      });
    case USER_CREATE:
      return assignToEmpty(errors, {
        userCreate: {}
      });
    case USER_CREATE_FAILURE:
      return assignToEmpty(errors, {
        userCreate: parseErrors(action.errors)
      });
    case USER_UPDATE:
      return assignToEmpty(errors, {
        userUpdate: {}
      });
    case USER_UPDATE_FAILURE:
      return assignToEmpty(errors, {
        userUpdate: parseErrors(action.errors)
      });
    case APP_LOGOUT_SUCCESS:
      return {};
    default:
      return errors;
  }
}

function parseErrors(errors) {
  let parsedErrors = {};

  if (errors && errors.errors) {
    if (errors.errors.errors && errors.errors.errors.length) {
      parsedErrors.globalErrors = errors.errors.errors;
    }

    if (errors.errors.children) {
      parsedErrors.fieldErrors = {};
      const children = errors.errors.children;
      for (var field in children) {
        if (children[field].errors && children[field].errors.length) {
          parsedErrors.fieldErrors[field] = children[field].errors;
        }
      }
    }
  }

  return parsedErrors;
}

export default errorsReducer;
