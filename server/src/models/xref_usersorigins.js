'use strict';
module.exports = (sequelize, DataTypes) => {
    const UsersOrigins = sequelize.define('xref_UsersOrigins', {
            userUuid: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false
            },
            originId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            paranoid: false,
            timestamps: false,
            scopes: {
                origins: {
                    include: ['Origin'],
                    attributes: [/* none */]
                },
                users: {
                    include: [{
                        association: 'User',
                        include: ['fullName']
                    }]
                }
            }
        });
    UsersOrigins.associate = function (models) {
        UsersOrigins.belongsTo(models['User'], {foreignKey: 'userUuid'});
        UsersOrigins.belongsTo(models['Origin'], {foreignKey: 'originId'});
    };
    return UsersOrigins;
};