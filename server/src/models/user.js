'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: sequelize.fn('uuid_generate_v4')
        },
        email: {
            type: DataTypes.STRING(355),
            allowNull: false,
            unique: true,
            isEmail: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true,
        }
    }, {
        paranoid: true,
        timestamps: true,
        defaultScope: {
            attributes: ['uuid', 'email', 'nickname']
        }
    });
    User.associate = function (models) {
        User.hasMany(models['Issue'], {foreignKey: 'createdBy', as: 'Issues'});
        User.hasMany(models['Issue'], {foreignKey: 'deletedBy', as: 'RemovedIssues'});
        User.hasMany(models['Comment'], {foreignKey: 'createdBy', as: 'Comments'});
        User.hasMany(models['Comment'], {foreignKey: 'deletedBy', as: 'RemovedComments'});
        User.hasMany(models['Attachment'], {foreignKey: 'createdBy', as: 'Attachments'});
        User.hasMany(models['Attachment'], {foreignKey: 'deletedBy', as: 'RemovedAttachments'});
        User.hasMany(models['Assignee'], {foreignKey: 'userUuid', as: 'Assignees'});
        User.hasMany(models['Assignee'], {foreignKey: 'createdBy', as: 'CreatedAssignees'});
        User.hasMany(models['IssueStateHistory'], {foreignKey: 'createdBy'});
    };
    return User;
};