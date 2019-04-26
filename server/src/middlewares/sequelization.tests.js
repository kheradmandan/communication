import {describe} from 'mocha'
import {expect} from 'chai'
import sequelizationError from './sequelization';

describe('Sequelization Middleware', () => {
    let req, res, next;
    beforeEach(() => {
        res = {};
        req = {};
        next = () => null;
    });

    it('Should handle sequelize errors', () => {
        const err = {name: 'SequelizeSomeTypesError', message: 'their message'};
        expect(() => sequelizationError(err, req, res, next))
            .to.throw()
    });

    it('Should pass none sequelize errors', () => {
        let passed = false;
        next = () => passed = true;
        sequelizationError(new Error(), req, res, next);
        expect(passed).to.be.true;
    });
});