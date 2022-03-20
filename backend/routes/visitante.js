const models = require('../models/index'),
    router = require('express').Router(),
    random = require("random-js")();

router.get('/', function (req, res, next) {
    models.Visitante.findAll({
        where: {
            etiqueta: {
                $ne: null
            }
        }
    }).then(function (visitantes) {
        res.send({
            success: true,
            message: 'Lista de Visitantes',
            Visitantes: visitantes
        });
    }).catch(function (error) {
        return next(error, req, res);
    });
});

router.post('/', function (req, res, next) {
    models.Visitante.create({
        sexo: req.body.sexo,
        peso: req.body.peso,
        altura: req.body.altura,
        anoNascimento: req.body.anoNascimento,
        vestimenta: req.body.vestimenta,
        corSuperior: req.body.corSuperior,
        corInferior: req.body.corInferior,
        etiqueta: random.integer(1000, 9998)
    }).then(function (visitante) {
        res.send({
            success: true,
            message: 'Visitante registrado!',
            Visitante: visitante
        });
    }).catch(function (err) {
        return next(err, req, res);
    });
});

router.get('/:id([0-9]+)', function (req, res, next) {
    models.Visitante.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (visitante) {
        res.send({
            success: true,
            message: 'Visitante',
            Visitante: visitante
        });
    }).catch(function (err) {
        return next(err, req, res);
    });
});

router.get('/etiqueta/:etiqueta([0-9]+)', function (req, res, next) {
    models.Visitante.findOne({
        where: {
            etiqueta: req.params.etiqueta
        }
    }).then(function (visitante) {
        res.send({
            success: true,
            message: 'Visitante',
            Visitante: visitante
        });
    }).catch(function (err) {
        return next(err, req, res);
    });
});

module.exports = router;
