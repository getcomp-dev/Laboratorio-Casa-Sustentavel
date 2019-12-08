const models        = require('../models/index'),
    router          = require('express').Router(),
    CustomError     = require('../library/CustomError');

router.get('/', function (req, res, next) {
    const query = {
        order: [['createdAt', 'DESC']],
        limit: req.query.limit || 50,
        include: [ {model: models.Ambiente}, {model: models.LogClimaticoExterno}]
    };

    if (req.query.filterAmbiente) {
        query.where = {
            ambienteId: req.query.filterAmbiente
        }
    }

    models.LogClimatico.findAll(query).then(function (logsClimaticos) {
        res.send({
            success: true,
            message: 'Lista de Logs Climaticos',
            LogsClimaticos: logsClimaticos
        });
    }).catch(function (error) {
        return next(error, req, res);
    });
});

module.exports = router;
