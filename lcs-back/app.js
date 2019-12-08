const express        = require('express'),
    path             = require('path'),
    cors             = require('cors'),
    morganLogger           = require('morgan'),
    bodyParser       = require('body-parser'),
    jwt              = require('express-jwt'),
    config           = require('./config/index'),
    ValidationErrors = require('./library/ValidationError'),
    SequelizeValidationError        = require('./models/index').Sequelize.ValidationError,
    authenticateRoute = require('./routes/authenticate'),
    usuarioRoute     = require('./routes/usuario'),
    visitanteRoute   = require('./routes/visitante'),
    ambienteRoute    = require('./routes/ambiente'),
    logClimaticoRoute    = require('./routes/log-climatico');

const winston = require('winston');
require('winston-daily-rotate-file');
const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new (winston.transports.DailyRotateFile)({
            filename: 'storage/logs/app-%DATE%.log',
        })
    ]
});

const app = express();

// Serve all the files in '/dist' directory
app.use(express.static('dist'));

//Allow cors
app.use(cors());

//Form handlers
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Logger
app.use(morganLogger('dev'));

const routerApi = express.Router();
routerApi.use(jwt({secret: config.jwt.secret, requestProperty: 'auth'}).unless({
    path: [
        { url: '/api/authenticate', methods: ['POST'] },
        { url: '/api/usuario', methods: ['POST'] },
        { url: '/api/ambiente', methods: ['GET'] }
        ]
}));

//Mapping routes
routerApi.use('/authenticate', authenticateRoute);
routerApi.use('/usuario', usuarioRoute);
routerApi.use('/visitante', visitanteRoute);
routerApi.use('/ambiente', ambienteRoute);
routerApi.use('/log-climatico', logClimaticoRoute);
routerApi.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use('/api', routerApi);

// Return index.html
app.use((req, res, next) => {
    res.sendfile(path.join(__dirname, './dist', 'index.html'));
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

        if (err.status != 401 && err.status != 404)
            logger.error(err.message, {err, req});
    } else {
        res.send({success: false, status: err.status, message: err.message});
        if (err.status != 401 && err.status != 404)
            logger.error(err.message, {err, req});
    }
});

module.exports = app;
