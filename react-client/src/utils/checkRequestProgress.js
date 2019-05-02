import {setRequestStatus, unsetRequestStatus} from "../actions/requests";

/**
 * Change or get request progress status.
 * @param requestType
 * @returns {function(*=, *): {unset: (function(): Function), alreadyInProgress: never}}
 */

export const checkRequestProgress = (requestType) => (dispatch, getState) => {

    // Is in progress?
    const alreadyInProgress = getState().requests.get(requestType);
    if (!alreadyInProgress) {
        dispatch(setRequestStatus(requestType, true));
    }

    // How to remove from progress
    const unset = () => () => {
        dispatch(unsetRequestStatus(requestType));
    };

    // Pass to caller to decide
    return {alreadyInProgress, unset}
};