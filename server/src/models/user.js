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
            set(value) {
                this.setDataValue('password', sequelize.fn('crypt', value, "gen_salt('bf', 8)"))
            }
        },
        nickname: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true,
        }
    }, {
        paranoid: true,
        timestamps: true,
    });
    User.associate = function (models) {
        User.hasMany(models['Issue'], {foreignKey: 'createdBy', as: 'Issues'});
        User.hasMany(models['Issue'], {foreignKey: 'deletedBy', as: 'RemovedIssues'});
        User.hasMany(models['Issue'], {foreignKey: 'intentionTo', as: 'Intentions'});
        User.hasMany(models['Comment'], {foreignKey: 'createdBy', as: 'Comments'});
        User.hasMany(models['Comment'], {foreignKey: 'deletedBy', as: 'RemovedComments'});
        User.hasMany(models['Attachment'], {foreignKey: 'createdBy', as: 'Attachments'});
        User.hasMany(models['Attachment'], {foreignKey: 'deletedBy', as: 'RemovedAttachments'});

    };
    return User;
};