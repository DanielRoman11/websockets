import { db } from "../db/database.js";
import { createJWT } from "../helpers/tokens.js";
import bcrypt from "bcrypt";
import validator from "validator";

export const register = (req, res) => {
  res.send("Holaa")
}

export const registerUser = async(req, res) => {
  const { name, lastname, email, password, reppassword } = req.body;

  if(validator.isEmpty(name) || validator.isEmpty(lastname) || validator.isEmpty(email) || validator.isEmpty(password)) return res.status(400).json({error: 'Todos los campos son requeridos...'});
  if(!validator.isEmail(email)) return res.status(400).json({error: 'Eso no parece un email'});
  if(!validator.isStrongPassword(password)) return res.status(400).json({error: 'El password es muy débil'});
  if(password.toString() !== reppassword.toString()) return res.status(400).json({error: 'Las contraseñas no coinciden!'});

  try {
    const user = await db.execute({
      sql: `
        SELECT
          email
        FROM users
        WHERE email = (:email);
      `,
      args: { email }
    })
    console.log(email);
    console.log(user);
    if (user.rows[0] === undefined) 
    return res.status(400).json({ error: "Email en uso" });
  
    if (user.rows[0].email.toString() === email) {
      return res.status(400).json({ error: "Email en uso" });
    }  
  }catch(error){
    console.error("Algo salio mal! ",error);
    return res.status(500).json({msg: "Error en el servidor"})
  }
  
  try{
  await bcrypt.genSalt(10)
    .then(async salt => {
      await bcrypt.hash(password, salt)
        .then(async hashPassword => {
          const currentDate = new Date();
          console.log(typeof hashPassword)
          await db.execute({
            sql: 
            `INSERT INTO users 
              (email, username, lastname, password, created_at, updated_at ) 
            VALUES (:email, :username, :lastname, :newPassword, :created_at, :updated_at);`,
            args: { 
              email: email,
              username: name,
              lastname: lastname,
              newPassword: hashPassword,
              created_at: currentDate.toLocaleString('es-CO', {timeZone: 'America/Bogota'}), 
              updated_at: currentDate.toLocaleString('es-CO', {timeZone: 'America/Bogota'}) 
            }
          })
        })
    })
  }catch(error) {
    console.error("No fue posible crear el usuario! ", error);
    return res.status(500).json({error: "Error en el servidor!"})
  }

  
  await db.execute({
    sql:`
    SELECT 
      id
    FROM users
    WHERE email = (:email);`,
    args: { email }
  })
    .then(id => {
      const token = createJWT(id);
      res.status(200).json({_id: id, name, email, token})
    })
    .catch(error => {
      console.error('Error al final! ', error);
      return res.status(500).json({msg: "Error en el servidor"})
    })
};