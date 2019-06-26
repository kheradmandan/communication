const {describe} = require('mocha');
const {expect} = require('chai');
const ability = require('.');

describe('core/ability', function abilitySuite() {

    it('Should allow do one thing', () => {

        const roles = ['go-shopping', 'have-dinner', 'read-book'];
        const indeed = 'have-dinner';

        expect(ability.can(roles)(indeed)).to.be.true;
    });

    it('Should allow do multiple thing', () => {

        const roles = ['go-shopping', 'have-dinner', 'read-book'];
        const indeed = ['have-dinner', 'go-shopping'];

        expect(ability.can(roles)(indeed)).to.be.true;
    });

});