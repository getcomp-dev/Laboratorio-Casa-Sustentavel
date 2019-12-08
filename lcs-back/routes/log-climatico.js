const models        = require('../models/index'),
    router          = require('express').Router(),
    {paginate}     = require('../library/Helpers'),
    CustomError     = require('../library/CustomError');

router.get('/', async (req, res, next) => {
    const query = {
        order: [['createdAt', 'DESC'], ['id', 'DESC']],
        include: [ {model: models.Ambiente}, {model: models.LogClimaticoExterno}]
    };

    if (req.query.filterAmbiente) {
        query.where = {
            ambienteId: req.query.filterAmbiente
        }
    }

    const pagination = await paginate(models.LogClimatico, query, req.query.page || 1, 20);

    models.LogClimatico.findAll({...query, limit: pagination.per_page, offset: pagination.offset}).then(function (logsClimaticos) {
        res.send({
            success: true,
            message: 'Lista de Logs Climaticos',
            LogsClimaticos: logsClimaticos,
            pagination
        });
    }).catch(function (error) {
        return next(error, req, res);
    });
});

module.exports = router;
