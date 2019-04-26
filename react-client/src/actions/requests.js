import {
    SET_REQUEST_STATUS,
    UNSET_REQUEST_STATUS
} from "../constants/requests";

export function setRequestStatus(requestType, status) {
    return {
        type: SET_REQUEST_STATUS,
        requestType,
        status
    }
}

export function unsetRequestStatus(requestType) {
    return {
        type: UNSET_REQUEST_STATUS,
        requestType
    }
}
