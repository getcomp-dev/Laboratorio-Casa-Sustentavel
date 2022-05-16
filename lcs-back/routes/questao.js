const models        = require('../models/index'),
     router = require('express').Router(),
     CustomError     = require('../library/CustomError');

router.get('/', function (req, res, next) {
    
})

router.post('/', function (req, res, next) {
     models.Questao.create({
          pergunta: req.body.pergunta,
          tipo: req.body.tipo,
          opcoes: req.body.opcoes,
          ordem: req.body.ordem,
     })
})
router.get()