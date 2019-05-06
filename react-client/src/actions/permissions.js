import * as permissionConstants from "../constants/permissions";

const wrapper = (payload) => !(payload instanceof Array) ? [payload] : payload;

export function setXrefUsersOrigins(payload) {
    return {
        type: permissionConstants.XREF_USERS_ORIGINS,
        payload: wrapper(payload)
    }
}

export function setXrefOriginsRealms(originId, payload) {
    return {
        type: permissionConstants.XREF_ORIGINS_REALMS,
        originId,
        payload: wrapper(payload)
    }
}
