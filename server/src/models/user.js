'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: sequelize.fn('uuid_generate_v4')
        },
        userTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {model: 'UserTypes', key: 'id'}
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
        fullName: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true,
        }
    }, {
        paranoid: true,
        timestamps: true,
        defaultScope: {
            attributes: ['uuid', 'email', 'fullName']
        }
    });
    User.associate = function (models) {
        User.belongsTo(models['UserType'], {foreignKey: 'userTypeId'});
        User.hasMany(models['Issue'], {foreignKey: 'createdBy', as: 'Issues'});
        User.hasMany(models['Issue'], {foreignKey: 'deletedBy', as: 'RemovedIssues'});
        User.hasMany(models['Comment'], {foreignKey: 'createdBy', as: 'Comments'});
        User.hasMany(models['Comment'], {foreignKey: 'deletedBy', as: 'RemovedComments'});
        User.hasMany(models['Attachment'], {foreignKey: 'createdBy', as: 'Attachments'});
        User.hasMany(models['Attachment'], {foreignKey: 'deletedBy', as: 'RemovedAttachments'});
        User.hasMany(models['Assignee'], {foreignKey: 'userUuid', as: 'Assignees'});
        User.hasMany(models['Assignee'], {foreignKey: 'createdBy', as: 'CreatedAssignees'});
        User.hasMany(models['IssueStateHistory'], {foreignKey: 'createdBy'});
        User.hasMany(models['UsersOrigins'], {foreignKey: 'userUuid'});
    };
    return User;
};