import { io } from "https://cdn.socket.io/4.3.0/socket.io.esm.min.js";

const socket = io("http://localhost:3000/",{
  auth: {
    token: '123',
    username: 'danielroman',
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