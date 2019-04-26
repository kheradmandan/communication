'use strict';
module.exports = (sequelize, DataTypes) => {
    const Attachment = sequelize.define('Attachment', {
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: sequelize.fn('uuid_generate_v4')
            },
            issueUuid: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            createdBy: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            deletedBy: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            title: {
                type: DataTypes.STRING(128),
                allowNull: true,
            },
            path: {
                type: DataTypes.TEXT,
                allowNull: true,
            }
        },
        {
            paranoid: true,
            timestamps: true,
        });
    Attachment.associate = function (models) {
        Attachment.belongsTo(models['Issue'], {foreignKey: 'issueUuid'});
        Attachment.belongsTo(models['User'], {foreignKey: 'createdBy'});
        Attachment.belongsTo(models['User'], {foreignKey: 'deletedBy'});
    };
    return Attachment;
};