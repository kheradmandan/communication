'use strict';
module.exports = (sequelize, DataTypes) => {
    const Realm = sequelize.define('Realm', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true
        }
    }, {
        paranoid: false,
        timestamps: false,
    });
    Realm.associate = function (models) {
        Realm.belongsTo(models['Realm'], {foreignKey: 'parentId', as: 'Parent'});
        Realm.hasMany(models['Issue'], {foreignKey: 'realmId'});
    };
    return Realm;
};