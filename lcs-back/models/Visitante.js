'use strict';

const VestimentaType    = require('../enums/VestimentaType');
const VestimentaCorType = require('../enums/VestimentaCorType');

module.exports = function (sequelize, DataTypes) {
    let Visitante = sequelize.define('Visitante', {
        sexo: {
            type: DataTypes.ENUM('M', 'F'),
            allowNull: false
        },
        peso: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        altura: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        anoNascimento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vestimenta: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: VestimentaType.TIPO1,
                max: VestimentaType.TIPO3
            }
        },
        corSuperior: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: VestimentaCorType.CLARA,
                max: VestimentaCorType.ESCURA
            }
        },
        corInferior: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: VestimentaCorType.CLARA,
                max: VestimentaCorType.ESCURA
            }
        },
        ambienteVisitado: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        etiqueta: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true
        }
    }, {
        freezeTableName: true
    });

    Visitante.associate = function (models) {
        Visitante.hasMany(models.Resposta, {
            foreignKey: {
                name: 'visitanteId',
                allowNull: false
            }
        });
    };

    return Visitante;
};