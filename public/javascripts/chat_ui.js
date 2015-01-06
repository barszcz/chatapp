(function() {

  if (typeof ChatApp === "undefined") {
    window.ChatApp = {};
  };

  var ChatUI = ChatApp.ChatUI = function () {
    this.chat = new ChatApp.Chat(io());
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
    this.$chatRoom.append(data.text);
  }

  $(document).ready(function () {
    var chatUI = new ChatApp.ChatUI();
    console.log("i'm here");
    chatUI.chat.socket.on("broadcast", chatUI.displayMessage.bind(chatUI));
    $("#chat-input").on("submit", function (event) {
      chatUI.sendMessage(event);
    });
  });



}());
