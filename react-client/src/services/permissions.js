import {getApi} from '../utils/fetch';
import * as actions from '../actions/permissions';

export const getPermissionForEra = (eraId) => (dispatch, getState) => {

    getApi({
        url: `/permissions/eras/${eraId}`,
        title: 'get-permission-for-specified-era-only',
        dispatches: [data => actions.forSpecifiedEra(eraId, data)],
        dispatch, getState
    });

};

export const getAvailablePermissions = () => (dispatch, getState) => {

    getApi({
        url: `/permissions/eras/available`,
        title: 'get-available-permissions',
        dispatches: [actions.available],
        dispatch, getState
    });

};
