const models        = require('../models/index'),
    router          = require('express').Router();

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
        res.send({
            success: true,
            message: 'Ambiente',
            Ambiente: ambiente
        });
    }).catch(function (err) {
        return next(err, req, res);
    });
});


module.exports = router;
