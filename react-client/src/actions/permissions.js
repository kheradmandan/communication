import * as constants from "../constants/permissions";

export function forSpecifiedEra(eraId, payload) {
    return {
        type: constants.SPECIFIED_ERA_ONLY,
        _id: eraId,
        payload
    }
}

export function available(payload) {
    return {
        type: constants.AVAILABLE,
        payload
    }
}
