import API from "../utils/API";
import {remoteUrl} from "../utils/remote-utils";
import {checkRequestProgress} from "../utils/checkRequestProgress";
import * as requestTypes from "../constants/request.types";
import * as permissionActions from "../actions/permissions";

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
            dispatch(permissionActions.setXrefUsersOrigins(data));
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
            dispatch(permissionActions.setXrefOriginsRealms(originId, data));
        })
        .catch(({data: {data: error}}) => {
            console.log('error', url, error);
        })
        .finally(status.unset())
};