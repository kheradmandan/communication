import {describe} from 'mocha';
import {expect} from 'chai';
import reducer from '.';
import * as actions from "../../actions/issues";

describe('reducers/requests', () => {

    it('Should reload issue list', () => {

        const payload = [1, 2, '3', {four: 5}];
        const state = reducer(undefined, actions.reload(payload));
        expect(state.get('list').toJS()).to.deep.equal(payload);

        const payloadToReplace = ['Well', 'hello'];
        const nextState = reducer(state, actions.reload(payloadToReplace));
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
                reducer(state, actions.append(payload))
            , undefined);
        expect(state.get('list').toJS()).to.deep.equal(payloads.reduce((state, x) => state.concat(x), []));
    });

    it('Should handle one objects instead of list', () => {

        const payload = {_id: 'am', an: 'object'};
        const state = reducer(undefined, actions.reload(payload));
        expect(state.get('list').toJS()).to.deep.equal([payload]);

        const nextState = reducer(state, actions.append(payload));
        expect(nextState.get('list').toJS()).to.deep.equal([payload, payload]);
    });

    it('Should set current issue details', () => {

        const payload = {_id: 'some issue uuid', title: 'title', sequence: 10};
        const state = reducer(undefined, actions.currentIssue(payload));
        expect(state.get('current').toJS()).to.deep.equal(payload);
    });

    it('Should update draft', () => {

        const payload = {_id: 'some issue uuid', title: 'title', sequence: 10};
        const state = reducer(undefined, actions.draftIssue(payload));
        expect(state.get('draft').toJS()).to.deep.equal(payload);
    });

    it('Should change assignee', () => {

        const payload = {_id: 'some issue uuid', title: 'title', sequence: 10};
        const state_1 = reducer(undefined, actions.currentIssue(payload));
        const state = reducer(state_1, actions.assigneeHasChanged());

        expect(state.get('current').toJS()).to.deep.equal({_id: payload._id, reloadRequired: true});
    });

    it('Should expire current issue details', () => {

        const payload = {_id: 'some issue uuid', title: 'title', sequence: 10};
        const state_1 = reducer(undefined, actions.currentIssue(payload));
        const state = reducer(state_1, actions.expireCurrentIssue());

        expect(state.get('current').toJS()).to.deep.equal({_id: payload._id, reloadRequired: true});
    });

});
