'use strict';
module.exports = (sequelize, DataTypes) => {
    const Issue = sequelize.define('Issue', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: sequelize.fn('uuid_generate_v4')
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
        defaultScope: {
            include: ['Creator', 'Priority', 'Realm', 'Era']
        },
        scopes: {
            view: {
                include: [
                    {
                        association: 'Era',
                        attributes: ['uuid', 'title'],
                        include: ['Origin']
                    },
                    {
                        association: 'Creator',
                        attributes: ['email', 'fullName']
                    }
                    ,
                    'Status',
                    'Priority',
                    'Realm',
                ],
                attributes: ['uuid', 'title', 'sequence', 'createdAt']
            },
            details: {
                include: [{
                    association: 'Assignees',
                    include: ['User', 'Parent']
                }]
            }
        }
    });
    Issue.associate = function (models) {
        Issue.belongsTo(models['User'], {foreignKey: 'createdBy', as: 'Creator'});
        Issue.belongsTo(models['User'], {foreignKey: 'deletedBy', as: 'Deleter'});
        Issue.belongsTo(models['Priority'], {foreignKey: 'priorityId'});
        Issue.belongsTo(models['Realm'], {foreignKey: 'realmId'});
        Issue.belongsTo(models['Status'], {foreignKey: 'statusId'});
        Issue.belongsTo(models['Era'], {foreignKey: 'eraUuid'});
        Issue.hasMany(models['Comment'], {foreignKey: 'issueUuid'});
        Issue.hasMany(models['Attachment'], {foreignKey: 'issueUuid'});
        Issue.hasMany(models['Assignee'], {foreignKey: 'issueUuid'});
        Issue.hasMany(models['IssueStateHistory'], {foreignKey: 'issueUuid'});
    };
    return Issue;
};