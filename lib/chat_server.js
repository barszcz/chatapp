var chatServer = function(server) {
  var io = require('socket.io')(server);

  var guestNumber = 1;
  var nicknames = {};



  io.on('connection', function (socket) {
    nicknames[socket.id] = "guest" + guestNumber;
    guestNumber++;

    socket.emit('broadcast', {text: "hello " + nicknames[socket.id]})

    socket.on('message', function (data) {
      io.emit('broadcast', {
        text: data.message,
        nick: nicknames[socket.id]
        });
    });

    socket.on('nicknameChangeRequest', function (data) {
      var nameTaken = false;
      var nick = data.nick;

      if (nick.match(/guest/)) {
        socket.emit('nicknameChangeResult', {
          success: false,
          text: 'Names cannot contain "Guest".'
        })
        return;
      }

      for (var socketId in nicknames) {
          var nickname = nicknames[socketId];
          // socket.emit('broadcast', {text: nickname});
          if (nickname === nick) {
            socket.emit('nicknameChangeResult', {
              success: false,
              text: 'That nickname is already taken'
            });
            return;
        }
      }


    nicknames[socket.id] = nick;
    socket.emit('nicknameChangeResult', {
      success: true,
      text: 'Nickname changed!'
      });
    });
  });
}

module.exports = chatServer;
