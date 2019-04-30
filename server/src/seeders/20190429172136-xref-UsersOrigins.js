'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`
        INSERT INTO "xref_UsersOrigins" ("userUuid", "originId")
        SELECT "u"."uuid", "o"."id" FROM "Users" AS "u" JOIN "Origins" AS "o" ON "o"."id" > 0; 
        `);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('xref_UsersOrigins', null, {});
    }
};
