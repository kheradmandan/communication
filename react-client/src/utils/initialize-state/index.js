import * as permissionService from '../../services/permissions';
import {setAuthorization} from "../remote-api-engine";

export default function initializeState(dispatch, getState) {

    const session = getState().users.get('session');

    // tuning headers for remote request
    setAuthorization(session.get('token'));

    // load  permissions
    permissionService.getAvailablePermissions()(dispatch, getState);

}