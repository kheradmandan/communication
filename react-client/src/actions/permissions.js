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
