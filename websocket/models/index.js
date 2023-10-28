import { db } from "../db/database.js";

export async function CreateDatabases() {
  db.executeMultiple(`
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
  `)
    .then(
      console.log("Tablas insertadas satisfactoriamente!")
    )
    .catch(error => {
      console.log("Error al cargar las tablas: ", error);
    })
}
