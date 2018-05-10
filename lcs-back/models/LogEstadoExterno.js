'use strict';

module.exports = function (sequelize, DataTypes) {
    let LogClimaticoExterno = sequelize.define('LogClimaticoExterno', {
        temperatura: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        umidade: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        luminosidade: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        updatedAt: false
    });

    LogClimaticoExterno.associate = function (models) {
        LogClimaticoExterno.hasMany(models.LogClimatico, {
            foreignKey: {
                name: 'LogClimaticoExterno',
                allowNull: false
            }
        });
    };

    return LogClimaticoExterno;
};