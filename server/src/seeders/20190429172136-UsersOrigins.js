'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`
        INSERT INTO "UsersOrigins" ("userUuid", "originId")
        SELECT "u"."uuid", "o"."id" FROM "Users" AS "u" LEFT JOIN "Origins" AS "o" ON "o"."id" > 0; 
        `);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('UsersOrigins', null, {});
    }
};
