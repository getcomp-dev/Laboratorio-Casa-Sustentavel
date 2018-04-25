'use strict';

const QuestaoType = require('../enums/QuestaoType');

module.exports = function (sequelize, DataTypes) {
    let Questao = sequelize.define('Questao', {
        pergunta: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: QuestaoType.RADIO,
                max: QuestaoType.EMOTICON5
            }
        },
        opcoes: {
            type: DataTypes.JSON,
            allowNull: true
        },
        ordem: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Questao.associate = function (models) {
        Questao.hasMany(models.Resposta, {
            foreignKey: {
                name: 'Questao',
                allowNull: false
            }
        });
    };

    return Questao;
};