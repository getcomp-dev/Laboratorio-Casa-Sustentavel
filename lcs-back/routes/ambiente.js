const models        = require('../models/index'),
    router          = require('express').Router(),
    CustomError     = require('../library/CustomError');

router.get('/', function (req, res, next) {
    models.Ambiente.findAll({
        order: [
            ['ordem', 'ASC']
        ]
    }).then(function (ambientes) {
        res.send({
            success: true,
            message: 'Lista de Ambientes',
            Ambientes: ambientes
        });
    }).catch(function (error) {
        return next(error, req, res);
    });
});

router.get('/:id([0-9]+)', function (req, res, next) {
    models.Ambiente.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (ambiente) {
        if (!ambiente)
            throw new CustomError(400, 'Ambiente inválido');

        res.send({
            success: true,
            message: 'Ambiente',
            Ambiente: ambiente
        });
    }).catch(function (err) {
        return next(err, req, res);
    });
});

router.post('/:id([0-9]+)/configuracao', function (req, res, next) {
    models.Ambiente.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (ambiente) {
        if (!ambiente)
            throw new CustomError(400, 'Ambiente inválido');

        let newConf = ambiente.configuracao;
        newConf.push({ 'nome': req.body.nome, 'valor': false});

        return ambiente.update({
            configuracao: newConf
        });
    }).then(function () {
        res.send({
            success: true,
            message: 'Configuracao adicionada'
        });
    }).catch(function (err) {
        return next(err, req, res);
    });
});

router.post('/:id([0-9]+)/configuracao/:confid([0-9]+)', function (req, res, next) {
    models.Ambiente.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (ambiente) {
        if (!ambiente)
            throw new CustomError(400, 'Ambiente inválido');

        let newConf = ambiente.configuracao;
        newConf[req.params.confid].valor = !newConf[req.params.confid].valor;

        return ambiente.updateAttributes({
            configuracao: newConf
        });
    }).then(function () {
        res.send({
            success: true,
            message: 'Configuracao adicionada'
        });
    }).catch(function (err) {
        return next(err, req, res);
    });
});


module.exports = router;
