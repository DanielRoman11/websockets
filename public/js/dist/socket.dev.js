"use strict";

var _socketIoEsmMin = require("https://cdn.socket.io/4.3.0/socket.io.esm.min.js");

var socket = (0, _socketIoEsmMin.io)({
  auth: {
    token: '123',
    username: 'danielroman',
    serverOffset: 0
  }
});
var form = document.getElementById('form');
var input = document.getElementById('input');
var messages = document.getElementById('messages');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});
socket.on('chat message', function (msg, serverOffset) {
  var item = document.createElement('p');
  item.textContent = msg;
  messages.appendChild(item);
  messages.scrollTo(0, messages.scrollHeight);
  socket.auth.serverOffset = serverOffset;
});