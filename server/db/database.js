import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import { CreateDatabases } from "../controllers/middleware/models/index.js";
dotenv.config()

export const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN
});

export async function dbConnection() {
  db.sync()
    .then(console.log("Conexión a la Database 🙆‍♂️"))
    .catch(error =>{
      console.error("No hay conexión a la Database: ", error)
    })
}

CreateDatabases();
