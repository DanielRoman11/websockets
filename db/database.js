import { createClient } from "@libsql/client";
import dotenv from "dotenv";
dotenv.config()

export const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`)

export async function dbConnection() {
  await db.sync()
    .then(() =>{
      console.log("Conexión a la Database 🙆‍♂️");
    })
    .catch((error) =>{
      console.error("No hay conexión a la Database: ", error)
      exit(1);
    })
}
