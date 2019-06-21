import API from "../utils/API";
import {remoteUrl} from "../utils/remote-utils";
import {checkRequestProgress} from "../utils/checkRequestProgress";
import {apiErrorHandler} from "./messages";
import * as requestTypes from "../constants/request.types";
import * as permissionActions from "../actions/permissions";

// Load xref-users-origins
export const getPermissionForEra = (eraId) => (dispatch, getState) => {

    const status = checkRequestProgress(requestTypes.PERMISSION)(dispatch, getState);
    if (status.alreadyInProgress) {
        return;
    }

    const url = remoteUrl(`/permissions/${eraId}`);
    API
        .get(url)
        .then(({data}) => {
            dispatch(permissionActions.setPermissionForEra(eraId, data));
        })
        .catch(apiErrorHandler(dispatch, getState))
        .finally(status.unset())
};
