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
        });
    UsersOrigins.associate = function (models) {
        UsersOrigins.belongsTo(models['User'], {foreignKey: 'userUuid'});
        UsersOrigins.belongsTo(models['Origin'], {foreignKey: 'originId'});
    };
    return UsersOrigins;
};