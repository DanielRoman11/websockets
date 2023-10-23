import { createClient } from "@libsql/client";
import { exit } from "node:process";
import dotenv from "dotenv";
dotenv.config()

export const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN
});

export async function dbConnection() {
  db.sync()
   .then(() =>{
     console.log("Conexión a la Database 🙆‍♂️");
   })
   .catch((error) =>{
     console.error("No hay conexión a la Database: ", error)
     exit(1);
   })
}

await Promise.all([
    db.execute(`
    -- Crear la tabla de chats
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      content TEXT,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (chat_id) REFERENCES chats(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    `),
    db.execute(`
      -- Crear la tabla de usuarios
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        username TEXT NOT NULL,
        lastname TEXT NOL NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `),
    db.execute(`
      -- Crear la tabla de mensajes
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chat_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        content TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (chat_id) REFERENCES chats(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
     );
   `),
    db.execute(`
      -- Crear la tabla de participantes de chat
      CREATE TABLE IF NOT EXISTS chat_participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chat_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (chat_id) REFERENCES chats(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `),
    db.execute(`
      -- Crear la tabla de notificaciones
      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chat_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        message_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (chat_id) REFERENCES chats(id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (message_id) REFERENCES messages(id)
      );
    `),
    db.execute(`
    -- Crear la tabla de errores
    CREATE TABLE IF NOT EXISTS errors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content INTEGER NOT NULL
    );
  `),
])
  .then(async ()=>{    
    await Promise.all([
      db.execute(`INSERT INTO errors (content) VALUES ('Nombre o Apellido invalido')`),
      db.execute(`INSERT INTO errors (content) VALUES ('Email invalido')`),
      db.execute(`INSERT INTO errors (content) VALUES ('Password invalido')`),
      db.execute(`INSERT INTO errors (content) VALUES ('Password no coinciden')`),
    ])
  })
  .catch(error => {
    console.error(error);
    exit(1)
  })


