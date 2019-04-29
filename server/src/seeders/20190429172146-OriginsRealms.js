'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`
        INSERT INTO "OriginsRealms" ("originId", "realmId")
            SELECT "o"."id" As "originId", "r"."id" AS "realmId" FROM "Origins" AS "o" 
                LEFT JOIN "Realms" AS "r" ON "o"."id" IS NOT NULL AND "o"."id" > 0; 
        `);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('OriginsRealms', null, {});
    }
};
