import { combineReducers } from 'redux';
import currentUserReducer from './currentUserReducer';
import errorsReducer from './errorsReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({ currentUser: currentUserReducer, errors: errorsReducer, users: usersReducer });

export default rootReducer;
