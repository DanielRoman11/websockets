import { io } from "https://cdn.socket.io/4.6.0/socket.io.min.js";

const socket = io({
  auth: {
    serverOffset: 0
  }
});

const input = document.querySelector('#input');
const form = document.getElementById('form');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', (msg, serverOffset, hora) => {
  const item = document.createElement('p');
  const time =document.createElement('span');
  
  item.textContent = msg;
  time.textContent = hora;

  item.appendChild(time)
  messages.appendChild(item);

  messages.scrollTo(0, messages.scrollHeight);
  socket.auth.serverOffset = serverOffset;
});
