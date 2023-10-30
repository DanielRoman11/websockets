

document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar que se envíe el formulario por defecto

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  fetch("/api/login", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = "/client/index.html";
    })
    .catch((error) => {
      console.error("Algo salió mal! ", error);
    });
});
