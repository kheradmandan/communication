'use strict';
module.exports = (sequelize, DataTypes) => {
    const Origin = sequelize.define('Origin', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
    Origin.associate = function (models) {
        Origin.belongsTo(models['Origin'], {foreignKey: 'parentId', as: 'Parent'});
        Origin.hasMany(models['Era'], {foreignKey: 'originId'});
        Origin.hasMany(models['xref_UsersOrigins'], {foreignKey: 'originId', as: 'PermitUsers'});
        Origin.hasMany(models['xref_OriginsRealms'], {foreignKey: 'originId', as: 'PermitRealms'});
    };
    return Origin;
};