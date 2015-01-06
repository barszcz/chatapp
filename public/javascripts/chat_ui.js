(function() {

  if (typeof ChatApp === "undefined") {
    window.ChatApp = {};
  };

  var ChatUI = ChatApp.ChatUI = function () {
    this.chat = new ChatApp.Chat({socket: io(), ui: this});
    this.$chatRoom = $(".chatroom");
  }

  ChatUI.prototype.getMessage = function () {
    var message = $(".field").val();
    return message;
  }

  ChatUI.prototype.sendMessage = function (event) {
    event.preventDefault();
    var message = this.getMessage();
    this.chat.sendMessage(message);
  }

  ChatUI.prototype.displayMessage = function (data) {
    var text = data.text;
    var nick = data.nick || "System";
    this.$chatRoom.append("<p><strong>" + nick + ": </strong>" + text + "</p>");
  }

  $(document).ready(function () {
    var chatUI = new ChatApp.ChatUI();
    console.log("i'm here");
    chatUI.chat.socket.on("broadcast", chatUI.displayMessage.bind(chatUI));
    chatUI.chat.socket.on("nicknameChangeResult", chatUI.displayMessage.bind(chatUI));
    $("#chat-input").on("submit", function (event) {
      event.preventDefault();
      var message = chatUI.getMessage();
      var command = message.match(/^\/(\w+) (\w+)/);
      if (command) {
        chatUI.chat.processCommand(command[1], command[2]);
      } else {
        chatUI.sendMessage(event);
      };
      $(".field").val('');
    });
  });



}());
