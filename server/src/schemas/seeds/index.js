const conf = require('../../conf');
const eraSeed = require('./era-seed');
const userSeed = require('./user-seed');
const originSeed = require('./origin-seed');

module.exports = async function seed(mongoose) {
    if (!conf.global.isProductionMode) {
        // await userSeed(mongoose);
        // await originSeed(mongoose);
        // await eraSeed(mongoose);
    }
};