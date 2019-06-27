import {describe} from 'mocha';
import {expect} from 'chai';
import reducer from '.';
import * as messageActions from '../../actions/messages';

describe('reducers/messages', () => {

    const someMessages = [
        {
            type: 'info',
            message: 'info message',
            actions: messageActions.info
        },
        {
            type: 'warn',
            message: 'warn message',
            actions: messageActions.warn
        },
        {
            type: 'error',
            message: 'error message',
            actions: messageActions.error
        },
    ];

    it('Should add proper message type', () => {

        someMessages.forEach(predicate => {
            const state = reducer(undefined, predicate.actions(predicate.message));

            expect(state.count()).to.be.equals(1);
            expect(state.get(0).get('id')).to.be.greaterThan(0);
            expect(state.get(0).get('type')).to.be.equals(predicate.type);
            expect(state.get(0).get('message')).to.be.equals(predicate.message);
        });
    });

    it('Should remove specified message', () => {

        const state = someMessages
            .reduce((prevState, predicate) =>
                    reducer(prevState, predicate.actions(predicate.message))
                , undefined);

        expect(state.count()).to.greaterThan(2);
        expect(state.count()).to.equals(someMessages.length);

        const id0 = state.get(0).get('id');
        const id1 = state.get(1).get('id');
        const id2 = state.get(2).get('id');

        const newState = reducer(state, messageActions.remove(id1));
        expect(newState.count()).to.equals(someMessages.length - 1);
        expect(newState.get(0).get('id')).to.equals(id0);
        expect(newState.get(1).get('id')).to.equals(id2);
    });

    it('Should clear all messages', () => {
        let state = someMessages
            .reduce((prevState, predicate) =>
                    reducer(prevState, predicate.actions(predicate.message))
                , undefined);

        expect(state.count()).to.greaterThan(2);
        expect(state.count()).to.equals(someMessages.length);

        const newState = reducer(state, messageActions.clear());
        expect(newState.count()).to.equals(0);
    });

    it('Should clear all messages have same type', () => {
        let state = someMessages
            .reduce((prevState, predicate) =>
                    reducer(prevState, predicate.actions(predicate.message))
                , undefined);

        state = someMessages
            .reduce((prevState, predicate) =>
                    reducer(prevState, predicate.actions(predicate.message))
                , state);

        expect(state.count()).to.equals(someMessages.length * 2);

        const newState = reducer(state, messageActions.removeType('info'));
        expect(newState.count()).to.equals(someMessages.length * 2 - 2);
    });

});