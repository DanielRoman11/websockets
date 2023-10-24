import { db } from "../db/database.js";
import { io } from "../index.js";
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
      console.error("Algo salio mal 🙅‍♂️: ", error);
    })

  if(!name || !lastname || !email || !password) return res.status(400).json('Todos los campos son requeridos...');
  
  if(!validator.isEmail(email)) return res.status(400).json('Eso no parece un email')
  if(!validator.isStrongPassword(password)) return res.status(400).json('El password es muy débil')
  if(!password.equals(reppassword)) return res.status(400).json('Las contraseñas no coinciden!')
};