'use strict';
module.exports = function (sequelize, DataTypes) {
    let LogClimatico = sequelize.define('LogClimatico', {
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

    LogClimatico.associate = function (models) {
        LogClimatico.hasMany(models.Resposta, {
            foreignKey: {
                name: 'logClimaticoId',
                allowNull: false
            }
        });

        LogClimatico.belongsTo(models.Ambiente,{
            foreignKey: {
                name: 'ambienteId',
                allowNull: false
            }
        });

        LogClimatico.belongsTo(models.LogClimaticoExterno,{
            foreignKey: {
                name: 'logClimaticoExternoId',
                allowNull: false
            }
        });
    };

    return LogClimatico;
};