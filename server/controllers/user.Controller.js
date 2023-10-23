import { db } from "../db/database.js";
import { io } from "../index.js";

export const registerUser = (req, res) => {
  res.sendFile(process.cwd() + '/client/register.html', {
    csrfToken: res.locals._csrf
  });
}

export const registerUserPost = async(req, res) => {
  const { name, lastname, email, password, reppassword  } = req.body;

  const userRegex = /^[A-Za-z]{5,20}$/
  const passwordRegex = /^\w{6,}$/g
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|es|co|org|org|net|gov|edu|info|io){2,}$/

  const serverErrors = []

  if(!emailRegex.test(email)) serverErrors.push('Email inválido');
  if(!passwordRegex.test(password)) serverErrors.push('Password inválido');
  if(password !== reppassword) serverErrors.push('Las contraseñas no coinciden inválido');
  if(!userRegex.test(name) || !userRegex.test(lastname)) serverErrors.push('Nombre o Apellido inválido');


  if (serverErrors.length){
    io.on('connection', socket => {
      socket.emit('serverErrors', serverErrors)
    })
  }

  const user = await db.execute({
    sql: `INSERT INTO users (email, username, lastname) VALUES (:email, :name, :lastname);`,
    args: { email, name, lastname  }
  })

  console.log(user);

  // res.redirect('/broadcast');
}