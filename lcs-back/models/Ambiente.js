'use strict';

module.exports = function (sequelize, DataTypes) {
    let Ambiente = sequelize.define('Ambiente', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ordem: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        configuracao: {
            type: DataTypes.JSON,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Ambiente.associate = function (models) {
        Ambiente.hasMany(models.Questionario, {
            foreignKey: {
                name: 'Ambiente',
                allowNull: false
            }
        });

        Ambiente.hasMany(models.LogEstado, {
            foreignKey: {
                name: 'Ambiente',
                allowNull: true
            }
        });
    };

    return Ambiente;
};