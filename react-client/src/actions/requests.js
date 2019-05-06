import * as requestConstants from "../constants/requests";

export function setRequestStatus(requestType, status) {
    return {
        type: requestConstants.SET_REQUEST_STATUS,
        requestType,
        status
    }
}

export function unsetRequestStatus(requestType) {
    return {
        type: requestConstants.UNSET_REQUEST_STATUS,
        requestType
    }
}
