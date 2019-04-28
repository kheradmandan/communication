'use strict';
module.exports = (sequelize, DataTypes) => {
    const Priority = sequelize.define('Priority', {
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
    Priority.associate = function (models) {
        Priority.hasMany(models['Issue'], {foreignKey: 'priorityId'});
        Priority.hasMany(models['IssueStateHistory'], {foreignKey: 'value', scope: {source: 'priority'}})
    };
    return Priority;
};