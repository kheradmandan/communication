import {describe} from 'mocha';
import {expect} from 'chai';
import reducer from '.';
import * as permissionActions from "../../actions/permissions";

describe('reducers/permissions', () => {

    it('Should set permissions for era', () => {

        const eraId = 'an-era-id';
        const payload = {_id: eraId, permission: {}};

        const state = reducer(undefined, permissionActions.forSpecifiedEra(eraId, payload));
        expect(state.get(eraId).toJS()).to.deep.equal(payload);
    });

    it('Should set available permissions in a glimpse', () => {

        const payload = [
            {_id: 'e-id-1', permission: {_id: 'p-id-1', some: 'other-fields'}},
            {_id: 'e-id-2', permission: {_id: 'p-id-2', some: 'other-fields'}},
            {_id: 'e-id-3', permission: {_id: 'p-id-3', some: 'other-fields'}},
            {_id: 'e-id-4', permission: {_id: 'p-id-4', some: 'other-fields'}},
        ];

        const expectedState = {};
        payload.forEach(p => expectedState[p._id] = p);

        const state = reducer(undefined, permissionActions.available(payload));
        expect(state.toJS()).to.deep.equal(expectedState);
    });

});
