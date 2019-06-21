import * as permissionConstants from "../constants/permissions";

export function setPermissionForEra(eraId, payload) {
    return {
        type: permissionConstants.GET_PERMISSION_FOR_ERA,
        _id: eraId,
        payload
    }
}
