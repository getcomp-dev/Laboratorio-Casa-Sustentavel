const SerialPort = require('serialport');
const port = new SerialPort('COM4');

let accumulator = '';

// temperatura, luminosidade e humidade
port.on('data', (text) => {
    accumulator += text;

    if(text.indexOf("\n") !== -1) {
        console.log("Data Received From Arduino: "+ accumulator);
        accumulator = '';
    }
});

port.on('open', () => {
    console.log("Connected to Arduino!");
});

port.on('close', () => {
    console.log("Disconnected from Arduino!");
});

port.on('error', () => {
    console.log("Arduino Error!");
});

port.on('disconnect', () => {
    console.log("Arduino Disconnect!");
});
