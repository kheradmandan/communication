import axios from 'axios';
import {remoteBaseUrl} from "./remote-utils";

const api = axios.create({
    baseURL: remoteBaseUrl,
    responseType: 'json'
});

export default api;