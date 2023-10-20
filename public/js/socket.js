import { io } from "https://cdn.socket.io/4.3.0/socket.io.esm.min.js";

const socket = io({
  auth: {
    serverOffset: 0
  }
});

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const chat = document.getElementById("chat")

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', (msg, serverOffset) => {
  const item = document.createElement('p');
  item.textContent = msg;
  messages.appendChild(item);

  messages.scrollTo(0, messages.scrollHeight);
});
