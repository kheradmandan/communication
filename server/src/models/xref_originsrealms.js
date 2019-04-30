'use strict';
module.exports = (sequelize, DataTypes) => {
    const OriginsRealms = sequelize.define('xref_OriginsRealms', {
            originId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            realmId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            }
        },
        {
            paranoid: false,
            timestamps: false,
        });
    OriginsRealms.associate = function (models) {
        OriginsRealms.belongsTo(models['Origin'], {foreignKey: 'originId'});
        OriginsRealms.belongsTo(models['Realm'], {foreignKey: 'realmId'});
    };
    return OriginsRealms;
};