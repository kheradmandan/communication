import {combineReducers} from "redux";
import requests from './requests';
import issues from './issues';
import users from './users';

export default combineReducers({
    requests,
    issues,
    users,
})