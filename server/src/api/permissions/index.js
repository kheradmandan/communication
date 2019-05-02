import protection from "../../middlewares/protection";
import xref_UsersOrigins from './xref-users-origins';
import xref_OriginsRealms from './xref-origins-realms';

export default function (router) {
    router.get('/permissions/xref/users/:uuid/origins', protection, xref_UsersOrigins);
    router.get('/permissions/xref/origins/:originId/realms', protection, xref_OriginsRealms);
}