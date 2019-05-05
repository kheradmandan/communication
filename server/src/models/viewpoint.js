'use strict';
module.exports = (sequelize, DataTypes) => {
    const ViewPoint = sequelize.define('Viewpoint', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true
        }
    }, {
        timestamps: false,
        paranoid: false
    });
    ViewPoint.associate = function (models) {
        ViewPoint.hasMany(models['Assignee'], {foreignKey: 'viewpointId'})
    };
    return ViewPoint;
};