'use strict';

module.exports = function (sequelize, DataTypes) {
    let LogEstado = sequelize.define('LogEstado', {
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
        },
        configuracao: {
            type: DataTypes.JSON,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        updatedAt: false
    });

    LogEstado.associate = function (models) {
        LogEstado.hasMany(models.Resposta, {
            foreignKey: {
                name: 'LogEstado',
                allowNull: false
            }
        });
    };

    return LogEstado;
};