import {describe} from 'mocha';
import {expect} from 'chai';
import reducer from '.';
import * as requestActions from "../../actions/requests";

describe('reducers/requests', () => {

    it('Should set request status', () => {

        const requestType = 'my-test-request-type';
        const status = true;
        const action = requestActions.setRequestStatus(requestType, status);

        const state = reducer(undefined, action);
        expect(state.get(requestType)).to.equals(status);
    });

    it('Should unset request status', () => {

        const requestType = 'my-test-request-type';
        const action = requestActions.unsetRequestStatus(requestType);

        const state = reducer(undefined, action);
        expect(state.get(requestType)).to.equals(undefined);
    });

});