'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Origins', [
            {id: 1, title: 'Tehran'},
            {id: 2, title: 'Andisheh', parentId: 1},
            {id: 3, title: 'Malard', parentId: 1},
            {id: 4, title: 'Shahryar', parentId: 1},
            {id: 5, title: 'Ostan Ghazvin'},
            {id: 6, title: 'Ghazvin', parentId: 5},
            {id: 7, title: 'Takestan', parentId: 5},
            {id: 8, title: 'Eghbaliyeh', parentId: 5},
            {id: 9, title: 'Sharifiyeh', parentId: 5},
            {id: 10, title: 'Zibashahr', parentId: 5},
            {id: 11, title: 'Shal', parentId: 5},
            {id: 12, title: 'Esfarvarin', parentId: 5},
            {id: 13, title: 'Shahrekord'},
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Origins', null, {});
    }
};
