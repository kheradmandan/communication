const {describe} = require('mocha');
const {expect} = require('chai');
const ability = require('.');

describe('core/ability', function abilitySuite() {

    it('Should allow to do one thing', () => {

        const roles = ['go-shopping', 'have-dinner', 'read-book'];
        const indeed = 'have-dinner';

        expect(ability.can(roles)(indeed)).to.be.true;
    });

    it('Should throw to deny to do one thing', () => {

        const roles = ['go-shopping', 'have-dinner', 'read-book'];
        const indeed = 'have-lunch';

        expect(() => ability.can(roles)(indeed)).to.throw;
    });

    it('Should deny to do one thing', () => {

        const roles = ['go-shopping', 'have-dinner', 'read-book'];
        const indeed = 'have-lunch';
        const throwOnFails = false;

        expect(ability.can(roles)(indeed, throwOnFails)).to.be.false;
    });

    it('Should allow to do multiple things', () => {

        const roles = ['go-shopping', 'have-dinner', 'read-book'];
        const indeed = ['have-dinner', 'go-shopping'];

        expect(ability.can(roles)(indeed)).to.be.true;
    });

    it('Should allow to do extra multiple things', () => {

        const roles = ['go-shopping', 'have-dinner', 'read-book'];
        const indeed = ['have-lunch', 'go-shopping'];

        expect(ability.can(roles)(indeed)).to.be.true;
    });

    it('Should throw to deny to do multiple things', () => {

        const roles = ['go-shopping', 'have-dinner', 'read-book'];
        const indeed = ['have-lunch', 'play-game'];

        expect(() => ability.can(roles)(indeed)).to.throw;
    });

    it('Should deny to do multiple things', () => {

        const roles = ['go-shopping', 'have-dinner', 'read-book'];
        const indeed = ['have-lunch', 'play-game'];
        const throwOnFails = false;

        expect(() => ability.can(roles)(indeed, throwOnFails)).to.throw;
    });

});