import {
  APP_ROUTE_CHANGED,
  APP_LOGIN,
  APP_LOGIN_FAILURE,
  APP_LOGOUT,
  USER_UPDATE,
  USER_UPDATE_FAILURE,
  TEAM_CREATE,
  TEAM_CREATE_FAILURE,
  TEAM_UPDATE,
  TEAM_UPDATE_FAILURE
} from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';

function errorsReducer(errors = {}, action) {
  Object.freeze(errors);

  switch (action.type) {
    case APP_ROUTE_CHANGED:
      // clear errors when user leaves current page
      return {};
    case APP_LOGIN:
      return assignToEmpty(errors, {
        appLogin: {}
      });
    case APP_LOGIN_FAILURE:
      return assignToEmpty(errors, {
        appLogin: parseErrors(action.errors)
      });
    case USER_UPDATE:
      return assignToEmpty(errors, {
        userUpdate: {}
      });
    case USER_UPDATE_FAILURE:
      return assignToEmpty(errors, {
        userUpdate: parseErrors(action.errors)
      });
    case TEAM_CREATE:
      return assignToEmpty(errors, {
        teamCreate: {}
      });
    case TEAM_CREATE_FAILURE:
      return assignToEmpty(errors, {
        teamCreate: parseErrors(action.errors)
      });
    case TEAM_UPDATE:
      return assignToEmpty(errors, {
        teamUpdate: {}
      });
    case TEAM_UPDATE_FAILURE:
      return assignToEmpty(errors, {
        teamUpdate: parseErrors(action.errors)
      });
    case APP_LOGOUT:
      return {};
    default:
      return errors;
  }
}

function parseErrors(errors) {
  const parsedErrors = {};

  if (errors && errors.errors) {
    if (errors.errors.errors && errors.errors.errors.length) {
      parsedErrors.globalErrors = errors.errors.errors;
    }

    if (errors.errors.children) {
      parsedErrors.fieldErrors = {};
      const children = errors.errors.children;
      for (const field in children) {
        if (children[field].errors && children[field].errors.length) {
          parsedErrors.fieldErrors[field] = children[field].errors;
        }
      }
    }
  }

  return parsedErrors;
}

export default errorsReducer;
