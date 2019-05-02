import {describe} from 'mocha';
import {expect} from 'chai';
import reducer from './index';
import * as issueActions from "../../actions/issues";

describe('Request Reducer', () => {

    it('Should reload issue list', () => {
        const payload = [1, 2, '3', {four: 5}];
        const state = reducer(undefined, issueActions.reload(payload));
        expect(state.get('list').toJS()).to.deep.equal(payload);

        const payloadToReplace = ['Well', 'hello'];
        const nextState = reducer(state, issueActions.reload(payloadToReplace));
        expect(nextState.get('list').toJS()).to.deep.equal(payloadToReplace);
    });

    it('Should append to issue list', () => {
        const payloads = [
            [1, 2, '3', {four: 5}],
            [6, 7, '8', {nine: 10, eleven: {twelve: 13}}],
            [0],
            [/r e g e x/ig],
            [1 / 0]
        ];
        const state = payloads.reduce((state, payload) =>
                reducer(state, issueActions.append(payload))
            , undefined);
        expect(state.get('list').toJS()).to.deep.equal(payloads.reduce((state, x) => state.concat(x), []));
    });

    it('Should handle Objects too', () => {
        const payload = {i: 'am', an: 'object'};
        const state = reducer(undefined, issueActions.reload(payload));
        expect(state.get('list').toJS()).to.deep.equal([payload]);

        const nextState = reducer(state, issueActions.append(payload));
        expect(nextState.get('list').toJS()).to.deep.equal([payload, payload]);
    });
});
