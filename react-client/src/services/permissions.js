import {getApi} from '../utils/fetch';
import * as actions from '../actions/permissions';
import {
    AVAILABLE_PERMISSIONS,
    FOR_SPECIFIED_ERA_ONLY
} from "../constants/request.types";

export const getPermissionForEra =
    eraId =>
        getApi({
            url: `/permissions/eras/${eraId}`,
            title: FOR_SPECIFIED_ERA_ONLY,
            dispatches: [data => actions.forSpecifiedEra(eraId, data)],
        });


export const getAvailablePermissions =
    () =>
        getApi({
            url: `/permissions/eras/available`,
            title: AVAILABLE_PERMISSIONS,
            dispatches: [actions.available],
        });