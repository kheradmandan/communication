import {describe} from "mocha";
import {expect} from "chai";
import reducer from '.';
import * as userActions from "../../actions/users";

describe('reducers/users', () => {

    it('Should store auth info', () => {

        const data = {
            type: 'jwt',
            token: 'some-token',
            user: {uuid: 'user uuid', email: 'user@email.com', nickname: 'user nickname'}
        };

        const state = reducer(undefined, userActions.authSuccess(data));
        expect(state.get('session').toJS())
            .to.deep.equals({
            isSignedIn: true,
            token: data.token,
            user: data.user
        });
    });

    it('Should clear session', () => {

        const state = reducer(undefined, userActions.authFailure('some reason'));

        expect(state.get('session').toJS())
            .to.deep.equals({
            isSignedIn: false,
            user: {},
            cause: 'some reason'
        });
    });
});