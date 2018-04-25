const models        = require('../models/index'),
    router          = require('express').Router(),
    jwt             = require('jsonwebtoken'),
    _               = require('lodash'),
    config          = require(__dirname + '/../config/index'),
    CustomError     = require('../library/CustomError'),
    passwordHash    = require('password-hash');

router.post('/', function (req, res, next) {
    models.Usuario.findOne({
        where: {
            login: req.body.login
        },
        raw: true
    }).then(function (usuario) {
        if(!usuario)
            throw new CustomError(404, 'Credencial inválida');

        if(!passwordHash.verify(req.body.senha, usuario.senha))
            throw new CustomError(400, 'Credencial inválida');

        res.send({
            success: true,
            message: 'Token criado',
            token: jwt.sign(_.omit(usuario, 'senha'), config.jwt.secret, { expiresIn: 60*60*5 }),
            Auth: _.omit(usuario, 'senha')
        });

    }).catch(function(err) {
        return next(err, req, res);
    });
});

router.get('/', function (req, res, next) {
    models.Usuario.findOne({
        where: {
            id: req.auth.id
        },
        raw: true
    }).then(function (usuario) {
        if(!usuario)
            throw new CustomError(404, 'Credencial não encontrada');

        res.send({
            success: true,
            message: 'Usuario encontrado',
            Auth: _.omit(usuario, 'senha')
        });

    }).catch(function(err) {
        return next(err, req, res);
    });
});

module.exports = router;