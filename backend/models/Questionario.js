'use strict';

module.exports = function (sequelize, DataTypes) {
    let Questionario = sequelize.define('Questionario', {
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        freezeTableName: true
    });

    Questionario.associate = function (models) {
        Questionario.hasMany(models.Questao, {
            foreignKey: {
                name: 'questionarioId',
                allowNull: false
            }
        });
    };


    return Questionario;
};