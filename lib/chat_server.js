var chatServer = function(server) {
  var io = require('socket.io')(server);

  io.on('connection', function (socket) {
    socket.emit('welcome', {message: "Hello!!!!!"});
    socket.on('message', function (data) {
      socket.emit('broadcast', {text: data.message});
    });
  });
}

module.exports = chatServer;
