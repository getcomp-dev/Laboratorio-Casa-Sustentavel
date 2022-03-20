'use strict';

module.exports = function (sequelize, DataTypes) {
    let Resposta = sequelize.define('Resposta', {
        resposta: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hora: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        updatedAt: false
    });

    return Resposta;
};