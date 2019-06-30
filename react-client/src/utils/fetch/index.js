import {remoteUrl} from '../remote-utils';
import {remoteApiEngine} from '../remote-api-engine';
import {apiErrorHandler} from '../../services/messages';
import {checkRequestProgress} from '../checkRequestProgress';

/**
 * @typedef {Object} Options
 * @property {String} url destination
 * @property {String} title log purposes and prevent multiple calls
 * @property {Array.<function.<Object>>} dispatches
 * @property {Object|undefined} data payload to send [in post requests]
 * @property {Object|undefined} params query to send [in get requests]
 * @property {function|undefined} onSuccess extra actions on success
 * @property {function|undefined} onFailure extra actions on failure
 */

/**
 * @typedef {Function} ReduxCaller
 * @param {function} dispatch redux store dispatch
 * @param {function} getState redux states
 * @return {Promise} of axios
 */

/**
 * Make a HTTP GET request to specified remoteApiEngine
 * @param {Options} options
 * @return {ReduxCaller}
 */
export function getApi(options) {
    return fetchApi(produceGetCall(options))(options);
}

/**
 * Make a HTTP POST request to specified remoteApiEngine
 * @param {Options} options
 * @return {ReduxCaller}
 */
export function postApi(options) {
    return fetchApi(producePostCall(options))(options);
}

// helpers
const produceGetCall = ({url, params}) => remoteApiEngine.get(remoteUrl(url), {params});
const producePostCall = ({url, data}) => remoteApiEngine.post(remoteUrl(url), data);

/**
 * make request
 * @curried
 * @function
 * @param apiCall
 * @returns {function({title?: *, dispatches?: *, onSuccess?: *, onFailure?: *}):ReduxCaller}
 */
const fetchApi = apiCall => ({title, dispatches = [], onSuccess, onFailure}) => (dispatch, getState) => {

    const status = checkRequestProgress(title)(dispatch, getState);
    if (status.alreadyInProgress) {
        return;
    }

    return new Promise(function (resolve, reject) {
        apiCall
            .then(response => {
                const {data} = response;
                dispatches.forEach(action => dispatch(action(data)));
                onSuccess && onSuccess(data);
                return data;
            })
            .then(resolve)
            .catch(err => {
                apiErrorHandler(dispatch, getState)(err);
                onFailure && onFailure(err);
                throw err;
            })
            .catch(reject)
            .finally(status.unset());
    });
};

