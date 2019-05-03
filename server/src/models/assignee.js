'use strict';
module.exports = (sequelize, DataTypes) => {
    const Assignee = sequelize.define('Assignee', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: sequelize.fn('uuid_generate_v4')
        },
        parent: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        issueUuid: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        userUuid: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    }, {
        paranoid: true,
        timestamps: true,
    });
    Assignee.associate = function (models) {
        Assignee.belongsTo(models['Assignee'], {foreignKey: 'parent', as: 'Parent'});
        Assignee.belongsTo(models['Issue'], {foreignKey: 'issueUuid'});
        Assignee.belongsTo(models['User'], {foreignKey: 'userUuid'});
        Assignee.belongsTo(models['User'], {foreignKey: 'createdBy', as: 'Creator'});
        Assignee.hasMany(models['Comment'], {foreignKey: 'assigneeUuid'});
        Assignee.hasMany(models['Attachment'], {foreignKey: 'assigneeUuid'});
    };
    return Assignee;
};