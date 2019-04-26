import {describe} from 'mocha'
import {expect} from 'chai'
import systemization from "./systemization";

describe('Systemization Middleware', () => {
    let req, res, next, sent, status, end;
    beforeEach(() => {
        res = {
            code: 0,
            end: () => end = true,
            json: d => sent = d,
            status: (c) => {
                status = c;
                return res;
            }
        };
        req = {};
        next = function () {
            throw new Error('It should not call')
        };
    });

    it('Should not pass any errors types', () => {
        const error = new Error('My message');

        systemization(error, req, res, next);
        expect(sent.error.message).to.equals(error.message);
    });

    it('Should end res on unhandled', () => {
        const error = null;

        systemization(error, req, res, next);
        expect(end).to.be.true;
    });

});