import { io } from "https://cdn.socket.io/4.3.0/socket.io.esm.min.js";

const socket = io("http://localhost:3000/");

const form = document.getElementById('form');

const name = document.getElementById('name')
const lastname = document.getElementById('lastname')
const email = document.getElementById('email')
const password = document.getElementById('password')
const reppassword = document.getElementById('reppassword')


form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (name.value) {
    
    socket.emit('chat message', );
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const item = document.createElement('p');
  const time =document.createElement('span');
  
  item.textContent = msg;

  item.appendChild(time)
  messages.appendChild(item);

  messages.scrollTo(0, messages.scrollHeight);
  socket.auth.serverOffset = serverOffset;
});
