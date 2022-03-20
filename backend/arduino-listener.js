const winston = require('winston');
require('winston-daily-rotate-file');
const models = require('./models/index');

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new (winston.transports.DailyRotateFile)({
            filename: 'storage/logs/arduino-listener-%DATE%.log',
        })
    ]

});

const insertLog = async (ambienteId, temperatura, luminosidade, umidade) => {

    const ambiente = await models.Ambiente.findOne({where: {id: ambienteId}});
    if (!ambiente) {
        throw new Error(`Ambiente ${ambienteId} não encontrado!`)
    }

    const logExterno = await models.LogClimaticoExterno.findAll({order: [['createdAt', 'DESC']], limit: 1});
    if (logExterno.length === 0) {
        throw new Error(`Nenhum log externo encontrado!`)
    }

    await models.LogClimatico.create({
        temperatura: temperatura,
        luminosidade: luminosidade,
        umidade: umidade,
        configuracao: ambiente.configuracao,
        ambienteId: ambiente.id,
        logClimaticoExternoId: logExterno[0].id
    });

};

const SerialPort = require('serialport');
const port = new SerialPort('COM4');

let accumulator = '';
const amb = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7
};

// temperatura, luminosidade e umidade
port.on('data', (text) => {
    accumulator += text;

    if(text.indexOf("\n") !== -1) {
        console.log("Data Received From Arduino: "+ accumulator);

        const match = /([A-Z]) - (\d+(\.\d+)?) - (\d+(\.\d+)?) - (\d+(\.\d+)?)/.exec(accumulator);

        if (!match) {
            logger.error('Mensagem inválida recebida.', {msg: accumulator});
        } else {
            console.log('Ambiente: '+match[1]);
            console.log('Temperatura: '+match[2]);
            console.log('Luminosidade: '+match[4]);
            console.log('Umidade: '+match[6]);

            insertLog(amb[match[1]], parseFloat(match[2]), parseFloat(match[4]), parseFloat(match[6])).catch(error => {
                logger.error('Erro ao inserir log.', {error, match});
            });
        }

        accumulator = '';
    }
});

port.on('open', () => {
    logger.info("Connected to Arduino!");
});

port.on('close', () => {
    logger.error("Disconnected from Arduino!");
});

port.on('error', (error) => {
    logger.error("Arduino Error!", {error});
});

port.on('disconnect', () => {
    logger.error("Arduino Disconnect!");
});
