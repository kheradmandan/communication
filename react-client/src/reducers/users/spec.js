import {describe} from "mocha";
import {expect} from "chai";
import reducer from './index';
import {authFailure, authSuccess} from "../../actions/users";

describe('User Reducer', () => {

    it('Should store auth info', () => {
        const data = {
            type: 'jwt',
            token: 'some-token',
            user: {uuid: 'user uuid', email: 'user@email.com', nickname: 'user nickname'}
        };

        const state = reducer(undefined, authSuccess(data));
        expect(state.get('session').toJS()).to.have.deep.equals({
            token: data.type + ' ' + data.token,
            user: data.user
        });
    });

    it('Should clear session', () => {
        const state = reducer(undefined, authFailure('some reason'));
        expect(state.get('session').toJS()).to.have.deep.equals({user: {}, cause: 'some reason'});
    });
});