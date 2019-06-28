import {remoteUrl} from '../remote-utils';
import {remoteApiEngine} from '../remote-api-engine';
import {apiErrorHandler} from '../../services/messages';
import {checkRequestProgress} from '../checkRequestProgress';

/**
 * @typedef {Object} Options
 * @property {String} url destination
 * @property {String} title log purposes and prevent multiple calls
 * @property {Array.<function.<Object>>} dispatches
 * @property {function} dispatch redux store dispatch
 * @property {function} getState redux states
 * @property {Object|undefined} data payload to send [in post requests]
 * @property {function|undefined} onSuccess extra actions on success
 * @property {function|undefined} onFailure extra actions on failure
 */

/**
 * Make a HTTP GET request to specified remoteApiEngine
 * @param {Options} options
 */
export function getApi(options) {
    fetchApi(produceGetCall(options))(options);
}

/**
 * Make a HTTP POST request to specified remoteApiEngine
 * @param {Options} options
 */
export function postApi(options) {
    fetchApi(producePostCall(options))(options);
}

// helpers
const produceGetCall = ({url}) => remoteApiEngine.get(remoteUrl(url));
const producePostCall = ({url, data}) => remoteApiEngine.post(remoteUrl(url), data);

// make request
const fetchApi = apiCall => ({title, dispatches = [], dispatch, getState, onSuccess, onFailure}) => {

    const status = checkRequestProgress(title)(dispatch, getState);
    if (status.alreadyInProgress) {
        return;
    }

    apiCall
        .then(response => {
            const {data} = response;
            dispatches.forEach(action => dispatch(action(data)));
            onSuccess && onSuccess(data)
        })
        .catch(err => {
            apiErrorHandler(dispatch, getState)(err);
            onFailure && onFailure(err);
        })
        .finally(status.unset());
};

