import { db } from "../db/database.js";
import { io } from "../index.js";
import { createJWT } from "../helpers/tokens.js";

import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";


export const registerUserPost = async(req, res) => {
  const { name, lastname, email, password, reppassword } = req.body;

  await db.execute(`
    SELECT
      email
    FROM users
    WHERE email = (:email);
  `)
    .then(user =>{
      if(user) res.status(400).json('Email en uso...');
    })
    .catch(error =>{
      console.error("Algo salio mal! ", error);
    })

  if(!name || !lastname || !email || !password) return res.status(400).json('Todos los campos son requeridos...');
  if(!validator.isEmail(email)) return res.status(400).json('Eso no parece un email');
  if(!validator.isStrongPassword(password)) return res.status(400).json('El password es muy débil');
  if(!password.equals(reppassword)) return res.status(400).json('Las contraseñas no coinciden!');

  await bcrypt.genSalt(10)
    .then(async salt => {
      await bcrypt.hash(password, salt)
        .then(async hashPassword => {
          const currentDate = new Date();
          await db.execute({
            sql: 
            `INSERT INTO users 
              (email, username, lastname, password, created_at, updated_at ) 
            VALUES (:email, :username, :lastname, :hashpassword,:created_at, :updated_at);`,
            args: { 
              email,
              username: name,
              lastname,
              hashPassword,
              created_at: currentDate.toLocaleString('es-CO', {timeZone: 'America/Bogota'}), 
              udpated_at: currentDate.toLocaleString('es-CO', {timeZone: 'America/Bogota'}) }
          })
            .catch(error => {
              console.error("Algo salió mal! ", error);
            })
        })
    })
    .catch(error => {
      console.error("Algo salio mal! ", error);
    });

  
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
      console.error('Algo salio mal! ', error);
    })
};