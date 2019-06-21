import {describe} from 'mocha';
import {expect} from 'chai';
import reducer from './index';
import {setPermissionForEra} from "../../actions/permissions";

describe('Permission Reducer', () => {

    it('Should set permissions for era', () => {
        const eraId = 'an-era-id';
        const payload = {_id: eraId, permission: {}};

        const state = reducer(undefined, setPermissionForEra(eraId,payload));
        expect(state.get(eraId).toJS()).to.deep.equal(payload);
    });

});
