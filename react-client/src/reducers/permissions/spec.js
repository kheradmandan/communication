import {describe} from 'mocha';
import {expect} from 'chai';
import reducer from './index';
import {setXrefOriginsRealms, setXrefUsersOrigins} from "../../actions/permissions";

describe('Permission Reducer', () => {

    it('Should load XREF_UsersOrigins permissions', () => {
        const payload = [{origin: {title: 'title1'}}, {origin: {title: 'title2'}}];

        const state = reducer(undefined, setXrefUsersOrigins(payload));
        expect(state.get('xref-users-origins').toJS()).to.deep.equal(payload);
    });

    it('Should load XREF_OriginsRealms permissions', () => {
        const originId = 1;
        const payload = [{realm: {title: 'title1'}}, {realm: {title: 'title2'}}];

        const state = reducer(undefined, setXrefOriginsRealms(originId, payload));
        expect(state.get('xref-origins-realms').toJS()).to.deep.equal({[originId]: payload});
    });

});
