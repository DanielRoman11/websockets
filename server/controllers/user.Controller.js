import e from "express";

export const registerUser = (req, res) => {
  res.sendFile(process.cwd() + '/client/register.html', {
    csrfToken: res.locals._csrf
  });
}

export const resgisterUserPost = (req, res) => {
  const { name, lastname, email, password, reppassword  } = req.body;

  const userRegex = /^[A-Za-z]{5,20}$/
  const passwordRegex = /^\w{6,}$/g
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|es|co|org|org|net|gov|edu|info){2,}$/

  if(!userRegex.test(name) || !userRegex.test(lastname)) return res.status(400).json({error: 'Nombre o apellido son inválido'})
  if(!passwordRegex.test(password)) return res.status(400).json({error: 'Password de mínimo 6 caracteres'})
  if(!emailRegex.test(email)) return res.status(400).json({error: 'La dirección de correo proporcionada es incorrecta'})
  if(password !== reppassword) return res.status(400).json({error: "Las contraseñas no coinciden"})

  res.redirect("/")

}