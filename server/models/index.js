import { db } from "../db/database.js";

export async function CreateDatabases() {
  await Promise.all([
    //* Crear la tabla de chats
    db.execute(`
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
    //* Crear la tabla de usuarios
    db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL,
        lastname TEXT NOL NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `),
    //* Crear la tabla de mensajes
    db.execute(`
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
  //* Crear la tabla de participantes de chat
    db.execute(`
      CREATE TABLE IF NOT EXISTS chat_participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chat_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (chat_id) REFERENCES chats(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `),
    //* Crear la tabla de notificaciones
    db.execute(`
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
    //* Crear la tabla de errores
    db.execute(`
    CREATE TABLE IF NOT EXISTS errors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content INTEGER NOT NULL
    );
  `),
  ])
  .catch(error => {
    console.error(error);
    exit(1)
  })
  await Promise.all([
  db.execute(`INSERT INTO errors (content) VALUES ('Nombre o Apellido invalido')`),
  db.execute(`INSERT INTO errors (content) VALUES ('Email invalido')`),
  db.execute(`INSERT INTO errors (content) VALUES ('Email en uso')`),
  db.execute(`INSERT INTO errors (content) VALUES ('Password invalido')`),
  db.execute(`INSERT INTO errors (content) VALUES ('Password no coinciden')`),
  ])
  .catch(error => {
    console.error(error);
    exit(1)
  })
}
