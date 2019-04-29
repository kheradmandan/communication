'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserType = sequelize.define('UserType', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true
        }
    }, {
        paranoid: false,
        timestamps: false,
    });
    UserType.associate = function (models) {
        UserType.hasMany(models['User'], {foreignKey: 'userTypeId'})
    };
    return UserType;
};