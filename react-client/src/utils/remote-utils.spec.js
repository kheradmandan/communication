import {describe} from 'mocha';
import {expect} from 'chai';
import * as utils from "./remote-utils";

describe('remote-utils', () => {

    describe('/avatarUrl', () => {

        it('Should generate avatar url', () => {
            const userId = 'someUserId';
            const avatarUrl = utils.avatarUrl(userId);

            expect(avatarUrl).be.contain(utils.remoteBaseUrl);
            expect(avatarUrl).be.contain(userId);
        });
    });

    describe('/remoteUrl', () => {

        it('Should generate remote url', () => {
            const sampleUrl = 'some/resources/to/bind';
            const remoteUrl = utils.remoteUrl(sampleUrl);

            expect(remoteUrl).to.contain(sampleUrl);
            expect(remoteUrl.endsWith(sampleUrl)).to.equals(true);
        });

        it('Should handle slash prefix', () => {
            const sampleUrlUnslash = 'some/resources/to/bind';
            const sampleUrlSlashed = '/some/resources/to/bind';

            expect(utils.remoteUrl(sampleUrlSlashed)).to.equals(utils.remoteUrl(sampleUrlUnslash));
        });
    });

});