const io = require('socket.io')(8181);
const printer = require('./library/printer');

io.on('connection', (socket) => {
  socket.on('doPrint', (data) => {
    printer(data).then((msg) => {
      socket.emit('printStatus', {'success': true, 'msg': msg});
    }).catch((msg) => {
      socket.emit('printStatus', {'success': false, 'msg': msg});
    });
  });

});

console.log('Socket.IO listening on 8181');
