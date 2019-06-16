const conf = require('../../conf');
const eraSeed = require('./era-seed');
const userSeed = require('./user-seed');
const RoleSeed = require('./role-seed');
const realmSeed = require('./realm-seed');
const originSeed = require('./origin-seed');

module.exports = async function seed(mongoose) {
    if (!conf.global.isProductionMode) {
        // await RoleSeed(mongoose);
        // await userSeed(mongoose);
        // await originSeed(mongoose);
        //  await realmSeed(mongoose);
        // await eraSeed(mongoose);
    }
};