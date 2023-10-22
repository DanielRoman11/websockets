"use strict";

var _socketIoEsmMin = require("https://cdn.socket.io/4.3.0/socket.io.esm.min.js");

var socket = (0, _socketIoEsmMin.io)("http://localhost:3000/", {
  auth: {
    token: '123',
    username: 'danielroman',
    serverOffset: 0
  }
});
var form = document.getElementById('form');
var input = document.getElemenById('input');
var messages = document.getElementById('messages');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});
socket.on('chat message', function (msg, serverOffset, hora) {
  var item = document.createElement('p');
  var time = document.createElement('span');
  item.textContent = msg;
  time.textContent = hora;
  item.appendChild(time);
  messages.appendChild(item);
  messages.scrollTo(0, messages.scrollHeight);
  socket.auth.serverOffset = serverOffset;
});

_socketIoEsmMin.io.use(function (socket, next) {
  var err = new Error("not authorized");
  err.data = {
    content: "Please retry later"
  }; // additional details

  next(err);
});