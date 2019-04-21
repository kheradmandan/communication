'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Realms', [
            {id: 0, title: 'Urban'},
            {id: 1, title: 'Income', parentId: 0},
            {id: 2, title: 'Duty', parentId: 0},
            {id: 3, title: 'Shops', parentId: 0},
            {id: 4, title: 'Zabeteh', parentId: 0},
            {id: 5, title: 'Takholafat', parentId: 0},
            {id: 6, title: 'Commissions', parentId: 0},
            {id: 7, title: 'Comm-77', parentId: 6},
            {id: 8, title: 'Comm-100', parentId: 6},
            {id: 9, title: 'Comm-5', parentId: 6},
            {id: 10, title: 'Digging', parentId: 0},
            {id: 11, title: 'Eng', parentId: 0},
            {id: 100, title: 'Abfa'},
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Realms', null, {});

    }
};
