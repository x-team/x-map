import { combineReducers } from 'redux';
import currentUserReducer from './currentUserReducer';
import errorsReducer from './errorsReducer';

const rootReducer = combineReducers({ currentUser: currentUserReducer, errors: errorsReducer });

export default rootReducer;
