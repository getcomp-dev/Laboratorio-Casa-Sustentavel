const models        = require('../models/index'),
    router          = require('express').Router(),
    _               = require('lodash'),
    passwordHash    = require('password-hash');

router.post('/', function (req, res, next) {
    models.Usuario.create({
        nome: req.body.nome,
        login: req.body.login,
        senha: passwordHash.generate(req.body.senha)
    }).then(function (usuario) {
        res.send({
            success: true,
            message: 'Usuário cadastrado',
            Usuario: _.omit(usuario.get({ plain: true }), 'senha')
        });
    }).catch(function(err) {
        return next(err, req, res);
    });
});

module.exports = router;