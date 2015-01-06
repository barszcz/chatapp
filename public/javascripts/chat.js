(function() {
  if (typeof ChatApp === "undefined") {
    window.ChatApp = {};
  };

  var Chat = ChatApp.Chat = function (options) {
    this.socket = options.socket;
    this.ui = options.ui;
  };

  Chat.prototype.sendMessage = function (message) {
    this.socket.emit('message', {message: message});
  };

  Chat.prototype.processCommand = function (command, argstring) {
    if (command === 'nick') {
      this.socket.emit('nicknameChangeRequest', {nick: argstring})
    } else {
      this.ui.displayMessage({text: "not a valid command"});
    }
  }
}());
