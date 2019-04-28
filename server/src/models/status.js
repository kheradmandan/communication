'use strict';
module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true
        }
    }, {
        paranoid: false,
        timestamps: false,
    });
    Status.associate = function (models) {
        Status.hasMany(models['Issue'], {foreignKey: 'statusId'});
        Status.hasMany(models['IssueStateHistory'], {foreignKey: 'value', scope: {source: 'status'}})
    };
    return Status;
};