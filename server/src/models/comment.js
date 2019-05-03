'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: sequelize.fn('uuid_generate_v4')
        },
        assigneeUuid: {
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
        context: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        paranoid: true,
        timestamps: true,
    });
    Comment.associate = function (models) {
        Comment.belongsTo(models['Assignee'], {foreignKey: 'assigneeUuid'});
        Comment.belongsTo(models['User'], {foreignKey: 'createdBy'});
        Comment.belongsTo(models['User'], {foreignKey: 'deletedBy'});
    };
    return Comment;
};