import { Server } from "socket.io";
import { createServer} from "node:http";
import { exit } from "node:process";
import { db } from "../db/database.js";

const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

export function socketConnection() {
  return io.on('connection', socketFunctions); 
}

const socketFunctions = async (socket) => {
  console.log(`Se ha conectado un usuario!🙆‍♂️`);

  if (!socket.recovered) {
    const offset = socket.handshake.auth.serverOffset ?? 0 

    await db.execute({
      sql: `
        SELECT * FROM messages
        WHERE id > (:offset)`,
      args: { offset }
    })
      .then((result) => {
        result.rows.map(row => {
          // console.log(row.timestamp.slice(12))
          
          socket.emit('chat message', row.content, row.id.toString(), row.timestamp.slice(12))})
      }).catch((err) => {
        console.error(err);
        exit(1)
      });
  }

  socket.on('disconnect', () => {
    console.log(`Se ha desconectado un usuario! 🙅‍♂️`);
  })

  socket.on('chat message', async(msg) => {
    const currentDate = new Date()

    await db.execute({
      sql: 'INSERT INTO messages (content, timestamp) VALUES (:msg, :timestamp);',
      args: { msg, timestamp: currentDate.toLocaleString('es-CO', {timeZone: 'America/Bogota'}) }
    })
      .then(result => {
        io.emit('chat message', msg, result.lastInsertRowid.toString(), currentDate.toLocaleTimeString('es-CO', {timeZone: 'America/Bogota'}))

        console.log("mensaje: ", msg, ", hora: ", currentDate.toLocaleTimeString('es-CO', {timeZone: 'America/Bogota'}));
      })
      .catch(error => {
        console.error("Hubo un error al enviar el mensaje: ", error);
      });
  });
}

