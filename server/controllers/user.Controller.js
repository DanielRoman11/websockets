import { db } from "../db/database.js";
import { createJWT } from "../helpers/tokens.js";
import bcrypt from "bcrypt";
import validator from "validator";


export const registerUser = async(req, res) => {
  const { name, lastname, email, password, reppassword } = req.body;

  if(validator.isEmpty(name) || validator.isEmpty(lastname) || validator.isEmpty(email) || validator.isEmpty(password)) return res.status(400).json({error: 'Todos los campos son requeridos...'});
  if(!validator.isEmail(email)) return res.status(400).json({error: 'Eso no parece un email'});
  if(!validator.isStrongPassword(password)) return res.status(400).json({error: 'El password es muy débil'});
  if(password !== reppassword) return res.status(400).json({error: 'Las contraseñas no coinciden!'});

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

    if (user.rows[0] !== undefined) { 
      if (user.rows[0].email === email) {
        return res.status(400).json({ error: "Email en uso" });
      }  
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
    .then(user => {
      const token = createJWT(user.rows[0].id);
      return res.status(200).json({_id: user.rows[0].id, name, email, token})
    })
    .catch(error => {
      console.error('Error al final! ', error);
      return res.status(500).json({msg: "Error en el servidor"})
    })
};

export const loginUser = async(req, res) =>{
  const { email, password } = req.body;

  if(validator.isEmpty(password) || validator.isEmpty(email)) return res.status(400).json({error: "Todos los campos son necesarios"})

  try {
    await db.execute({
      sql: `SELECT id, username, email, password FROM users WHERE email = (:email);`,
      args: {email}
    })
      .then(async user => {
        if(user.rows[0] === undefined)
          return res.status(400).json({error: "Email no registrado"})

        await bcrypt.compare(password, user.rows[0].password)
        .then(isValidPassword =>{
          if(!isValidPassword){ 
            return res.status(400).json({error: "Contraseña o correo incorrecto"})
        }
          const token = createJWT(user.rows[0].id);
    
          return res.status(200).json({_id: user.rows[0].id, name: user.rows[0].username, email, token})
        })
      })
  } catch (error) {
    console.error(error);
      return res.status(500).json({error: "Error en el servidor"})
  }
}

export const findUser = async(req, res) => {
  const { id } = req.params

  await db.execute({
    sql: `SELECT * FROM users WHERE id = (:id);`,
    args: {id}  
  })
    .then(user => {
      if(user.rows[0] === undefined)
          return res.status(400).json({error: "Usuario no registrado"})
      
      return res.status(200).json(user.rows[0])
    })
    .catch(error => {
      console.error("Algo salio mal! ", error);
    })
}

export const findAllUsers = async(req, res) => {
  await db.execute(`
    SELECT * FROM users;
  `)
    .then(users =>{
      return res.status(200).json(users.rows)
    })
    .catch(error =>{
      console.error("Algo salió mal!", error);
    })
}

export const deleteUser= async(req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    const user = await db.execute({
      sql: `SELECT id FROM users WHERE id = (:id);`,
      args: {id}
    })
    
    if(user.rows[0] === undefined)
      return res.status(400).json({error: "Usuario no registrado"})
  
    await db.execute({
      sql: `DELETE FROM users WHERE id = (:id)`,
      args: {id}
    })
      .then((result) => {
        console.log(`Usuario de id ${id} elimiando! `, result.rowsAffected);
        return res.status(204)
      })
  } catch (error) {
    console.error("Algo salio mal! ",error);
  }
}
