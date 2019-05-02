import API from "../utils/API";
import {XREF_ORIGINS_REALMS, XREF_USERS_ORIGINS} from "../constants/permissions";
import * as requestTypes from "../constants/request.types";
import {remoteUrl} from "../utils/remote-utils";
import {checkRequestProgress} from "../utils/checkRequestProgress";

const wrapper = (payload) => !(payload instanceof Array) ? [payload] : payload;

export function setXrefUsersOrigins(payload) {
    return {
        type: XREF_USERS_ORIGINS,
        payload: wrapper(payload)
    }
}

export function setXrefOriginsRealms(originId, payload) {
    return {
        type: XREF_ORIGINS_REALMS,
        originId,
        payload: wrapper(payload)
    }
}

// Load xref-users-origins
export const loadXrefUsersOrigins = (uuid) => (dispatch, getState) => {

    const status = checkRequestProgress(requestTypes.PERMISSION)(dispatch, getState);
    if (status.alreadyInProgress) {
        return;
    }

    const url = remoteUrl(`/permissions/xref/users/${uuid}/origins`);
    API
        .get(url)
        .then(({data: {data}}) => {
            dispatch(setXrefUsersOrigins(data));
        })
        .catch(({data: {data: error}}) => {
            console.log('error', url, error);
        })
        .finally(status.unset())
};

// Load xref-origins-realms
export const loadXrefOriginsRealms = (originId) => (dispatch, getState) => {

    const status = checkRequestProgress(requestTypes.PERMISSION)(dispatch, getState);
    if (status.alreadyInProgress) {
        return;
    }

    const url = remoteUrl(`/permissions/xref/origins/${originId}/realms`);
    API
        .get(url)
        .then(({data: {data}}) => {
            dispatch(setXrefOriginsRealms(originId, data));
        })
        .catch(({data: {data: error}}) => {
            console.log('error', url, error);
        })
        .finally(status.unset())
};