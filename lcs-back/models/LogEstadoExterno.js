'use strict';

module.exports = function (sequelize, DataTypes) {
    let LogEstadoExterno = sequelize.define('LogEstadoExterno', {
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

    LogEstadoExterno.associate = function (models) {
        LogEstadoExterno.hasMany(models.LogEstado, {
            foreignKey: {
                name: 'LogEstadoExterno',
                allowNull: false
            }
        });
    };

    return LogEstadoExterno;
};