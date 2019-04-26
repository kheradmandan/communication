import {combineReducers} from "redux";
import requests from './requests';
import users from './users';

export default combineReducers({
    requests,
    users,
})