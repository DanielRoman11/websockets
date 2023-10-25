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

  const data = {
    email: email.value,
    name: name.value,
    lastname: lastname.value,
    password: name.value,
  }

  if (!name.value) {
    console.log("Enviando!");
    socket.emit('chat message', data);
    name.value = '';
  }
});

socket.on('chat message', (msg) => {
  const item = document.createElement('p');
  item.textContent = msg;

  form.appendChild(item);

  messages.scrollTo(0, messages.scrollHeight);
  socket.auth.serverOffset = serverOffset;
});
