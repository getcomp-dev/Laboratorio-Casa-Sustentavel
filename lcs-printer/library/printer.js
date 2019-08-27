const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const printer = require("printer");
const util = require('util');
const winston = require('winston');
require('winston-daily-rotate-file');

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new (winston.transports.DailyRotateFile)({
      filename: 'storage/logs/application-%DATE%.log',
    })
  ]
});

const epson = printer.getPrinter('EPSON TM-T20 Receipt');

// Printer functions

const codeBufferGen = (data) => {
  let thermalPrinter = new ThermalPrinter({
    type: PrinterTypes.EPSON
  });

  thermalPrinter.alignCenter();
  thermalPrinter.print('Laboratório Casa Sustentável');
  thermalPrinter.newLine();
  thermalPrinter.newLine();
  thermalPrinter.setTextDoubleHeight();
  thermalPrinter.setTextDoubleWidth();
  thermalPrinter.print(data.data);
  thermalPrinter.cut();

  return thermalPrinter.getBuffer();
};

const resumeBufferGen = (data) => {
  // TODO

  return undefined;
};

module.exports = (data) => {
  return new Promise((resolve, reject) => {

    if (! epson || !epson.name) {
      reject('Impressora não encontrada.');
      return;
    }

    if(!data || !data.data || (data.template !== 'code' && data.template !== 'resume')) {
      reject('Dados inválidos para impressão.');
      return;
    }

    let printerBuffer = undefined;

    switch (data.template) {
      case 'code':
        printerBuffer = codeBufferGen(data);
        break;
      case 'resume':
        printerBuffer = resumeBufferGen(data);
        break;
    }

    if (! printerBuffer) {
      reject('Erro ao gerar buffer de impressão.');
      return;
    }

    printer.printDirect({
      data: printerBuffer,
      printer: epson.name,
      type: 'RAW',
      success(jobID) {
        setTimeout(() => {
          try{
            const jobInfo = printer.getJob(epson.name, jobID);

            if(!jobInfo || jobInfo.status.indexOf('PRINTED') !== -1 || jobInfo.status.indexOf('COMPLETE') !== -1) {
              resolve('Impressão realizada com sucesso');
              return;
            }

            printer.setJob(epson.name, jobID, 'CANCEL');
          } catch(err) {
            // Job não existe mais, provavelmente já imprimiu
            resolve('Impressão realizada com sucesso');
            return;
          }

          logger.error('Impressora desconectada', {data});
          reject('Impressora desconectada!');
        }, 1500);
      },
      error(err) {
        logger.error('Erro ao imprimir', {err, data});
        reject('Erro ao imprimir!');
      }
    });
  });
};