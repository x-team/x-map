import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import errorsReducer from './errorsReducer';
import usersReducer from './usersReducer';
import teamsReducer from './teamsReducer';
import conferencesReducer from './conferencesReducer';
import geoDataReducer from './geoDataReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
  users: usersReducer,
  teams: teamsReducer,
  conferences: conferencesReducer,
  geoData: geoDataReducer
});

export default rootReducer;
