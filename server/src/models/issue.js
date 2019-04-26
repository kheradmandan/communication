'use strict';
module.exports = (sequelize, DataTypes) => {
    const Issue = sequelize.define('Issue', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        intentionTo: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        createdBy: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        deletedBy: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        priorityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        realmId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        statusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        eraUuid: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: 'issue_IX_eraUuid_and_sequence',
        },
        sequence: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: 'issue_IX_eraUuid_and_sequence',
        },
        title: {
            type: DataTypes.STRING(512),
            allowNull: false,
        }
    }, {
        paranoid: true,
        timestamps: true,
    });
    Issue.associate = function (models) {
        Issue.belongsTo(models['User'], {foreignKey: 'createdBy', as: 'Creator'});
        Issue.belongsTo(models['User'], {foreignKey: 'deletedBy', as: 'Deleter'});
        Issue.belongsTo(models['User'], {foreignKey: 'intentionTo', as: 'IntentionTo'});
        Issue.belongsTo(models['Priority'], {foreignKey: 'priorityId'});
        Issue.belongsTo(models['Realm'], {foreignKey: 'realmId'});
        Issue.belongsTo(models['Status'], {foreignKey: 'statusId'});
        Issue.belongsTo(models['Era'], {foreignKey: 'eraUuid'});
        Issue.hasMany(models['Comment'], {foreignKey: 'issueUuid'});
        Issue.hasMany(models['Attachment'], {foreignKey: 'issueUuid'});
    };
    return Issue;
};