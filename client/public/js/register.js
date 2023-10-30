document.getElementById("form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const reppassword = document.getElementById("reppassword").value;

  const formData = new FormData();
  formData.append("username", username);
  formData.append("lastname", lastname);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("reppassword", reppassword);
  
  await fetch("http://localhost:3000", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
