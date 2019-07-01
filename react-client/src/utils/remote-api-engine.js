import axios from 'axios';
import {remoteBaseUrl} from "./remote-utils";

export const remoteApiEngine = axios.create({
    baseURL: remoteBaseUrl,
    responseType: 'json',
    headers: {'Access-Control-Allow-Origin': '*'}
});

export function setAuthorization(token) {
    remoteApiEngine.defaults.headers['authorization'] = token
}