import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import errorsReducer from './errorsReducer';
import usersReducer from './usersReducer';
import teamsReducer from './teamsReducer';
import geoDataReducer from './geoDataReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
  users: usersReducer,
  teams: teamsReducer,
  geoData: geoDataReducer
});

export default rootReducer;
