import { db } from "../db/database.js";
import { exit } from "node:process";

export async function CreateDatabases() {
  db.executeMultiple(`
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
  -- Crear la tabla de usuarios
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL,
      lastname TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  -- Crear la tabla de mensajes
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (chat_id) REFERENCES chats(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  -- Crear la tabla de participantes de chat
    CREATE TABLE IF NOT EXISTS chat_participants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (chat_id) REFERENCES chats(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
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
  `)
    .then(
      console.log("Tablas insertadas satisfactoriamente!")
    )
    .catch(error => {
      console.log("Error al cargar las tablas: ", error);
      exit(2)
    })
}
