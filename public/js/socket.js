import { io } from "https://cdn.socket.io/4.3.0/socket.io.esm.min.js";


const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

socket.on('chat message', (msg) => {
  console.log(msg);

  const item = document.createElement('p');
  item.textContent = msg;
  
  messages.appendChild(item);

  window.scrollTo(0, messages.scrollHeight);
})

socket.on('custom-event', (data) => {
  // Hacer algo con los datos recibidos del evento
  console.log('Evento personalizado recibido:', data);
});



form.addEventListener("submit", (e) => {
  e.preventDefault()

  if(input.value){
    socket.emit('Enviando mensaje:', input.value)
    input.value = ""
  }
});