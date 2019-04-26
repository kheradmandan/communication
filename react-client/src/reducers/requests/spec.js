import {describe} from 'mocha';
import {expect} from 'chai';
import reducer from './index';
import {setRequestStatus, unsetRequestStatus} from "../../actions/requests";

describe('Request Reducer', () => {

    it('Should set request status', () => {
        const requestType = 'my-test-request-type';
        const status = true;
        const action = setRequestStatus(requestType, status);

        const state = reducer(undefined, action);
        expect(state.get(requestType)).to.equals(status);
    });

    it('Should unset request status', () => {
        const requestType = 'my-test-request-type';
        const action = unsetRequestStatus(requestType);

        const state = reducer(undefined, action);
        expect(state.get(requestType)).to.be.undefined;
    });

});