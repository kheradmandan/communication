'use strict';
module.exports = (sequelize, DataTypes) => {
    const IssueStateHistory = sequelize.define('IssueStateHistory', {
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
        createdBy: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        source: {
            type: DataTypes.STRING,
            length: 32,
            allowNull: false,
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        paranoid: false,
        timestamps: true,
        scopes: {
            status: {
                where: {source: 'status'},
                include: {model: 'Status'}
            },
            priority: {
                where: {source: 'priority'},
                include: {model: 'Priority'}
            }
        }
    });
    IssueStateHistory.associate = function (models) {
        IssueStateHistory.belongsTo(models['IssueStateHistory'], {foreignKey: 'parent'});
        IssueStateHistory.belongsTo(models['Issue'], {foreignKey: 'issueUuid'});
        IssueStateHistory.belongsTo(models['User'], {foreignKey: 'createdBy'});
    };
    return IssueStateHistory;
};