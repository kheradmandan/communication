'use strict';
module.exports = (sequelize, DataTypes) => {
    const Era = sequelize.define('Era', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        originId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'era_IX_originId_and_title',
        },
        title: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: 'era_IX_originId_and_title',
        },
        current: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            unique: 'era_IX_originId_and_title',
        },
        initialize: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        increment: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        beginAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        finishAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        continues: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    }, {
        paranoid: true,
        timestamps: true,
    });
    Era.associate = function (models) {
        Era.belongsTo(models['Origin'], {foreignKey: 'originId'});
        Era.hasMany(models['Issue'], {foreignKey: 'eraUuid'});
    };
    return Era;
};