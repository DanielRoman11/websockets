import { io } from "https://cdn.socket.io/4.3.0/socket.io.esm.min.js";

const socket = io("http://localhost:3000/",{
  auth: {
    token: '123',
    username: 'danielroman',
    serverOffset: 0
  }
});

const form = document.getElementById("form");

form.addEventListener("submit", e => {
  const serverErrors = document.getElementById('serverErrors');
  if (serverErrors) serverErrors.style.display = 'none';
  
  fetch('/registro', {
    method: 'POST',
    body: new FormData(document.querySelector('form')),
  })
    .then((response) => {
      if (response.status === 200) {
        console.log('Registro exitoso');
      } else if (response.status === 400) {
        return response.json();
      } else {
        console.error('Error inesperado: ' + response.status);
      }
    })
    .then((data) => {
      if (data && data.error) {
        const serverErrors = document.getElementById('serverErrors');
        serverErrors.innerText = data.error;
        serverErrors.style.display = 'block';
      }
    })
    .catch((error) => {
      console.error('Error de red: ' + error);
      throw new Error
    });

  e.preventDefault(); 
});

document.getElementById('csrf-token').value = '<%= csrfToken %>'