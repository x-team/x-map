import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import errorsReducer from './errorsReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({ session: sessionReducer, errors: errorsReducer, users: usersReducer });

export default rootReducer;
