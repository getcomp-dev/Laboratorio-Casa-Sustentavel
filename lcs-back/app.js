const express        = require('express'),
    cors             = require('cors'),
    logger           = require('morgan'),
    bodyParser       = require('body-parser'),
    jwt              = require('express-jwt'),
    config           = require('./config/index'),
    ValidationErrors = require('./library/ValidationError'),
    SequelizeValidationError        = require('./models/index').Sequelize.ValidationError,
    authenticateRoute = require('./routes/authenticate'),
    usuarioRoute     = require('./routes/usuario'),
    visitanteRoute   = require('./routes/visitante'),
    ambienteRoute    = require('./routes/ambiente');

const app = express();

//Allow cors
app.use(cors());

//Form handlers
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Logger
app.use(logger('dev'));

app.use(jwt({secret: config.jwt.secret, requestProperty: 'auth'}).unless({path: [{ url: '/authenticate', methods: ['POST']  }, { url: '/usuario', methods: ['POST']  }, { url: '/ambiente', methods: ['GET']  }]}));

//Mapping routes
app.use('/authenticate', authenticateRoute);
app.use('/usuario', usuarioRoute);
app.use('/visitante', visitanteRoute);
app.use('/ambiente', ambienteRoute);

// Error handlers
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Catch 500 and forward to error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);

    if (err instanceof ValidationErrors) {
        res.send({success: false, status: err.status, message: err.message, data: err.data});
    } else if (err instanceof SequelizeValidationError) {
        let errors = [];
        err.errors.forEach(function (error) {
            errors.push({'field': error.path, 'message': error.message});
        });
        res.send({success: false, status: err.status, message: 'Validation errors ocurred', errors: errors});
    } else if (app.get('env') === 'development') {
        res.send({success: false, status: err.status, message: err.message, error: err});
    } else {
        res.send({success: false, status: err.status, message: err.message});
    }
});

module.exports = app;
