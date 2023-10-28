import { io } from  "./index.js";
import { db } from "./db/database.js";

export const chatFunctions = async (socket) => {
  console.log(`Se ha conectado un usuario!🙆‍♂️`);

  socket.on('msg', function(from, msg) {
    console.log(from, msg);
  })

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
          
          socket.emit('chat message', row.content, row.id.toString(), row.timestamp.slice(12))})
      }).catch((err) => {
        console.error(err);
      });
  }

  socket.on('disconnect', () => {
    console.log(`Se ha desconectado un usuario! 🙅‍♂️`);
  })
  socket.on("disconnecting", (reason) => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit("user has left", socket.id);
      }
    }
  });

  socket.on('chat message', async(msg) => {
    const currentDate = new Date();

    await db.execute({
      sql: 'INSERT INTO messages (content, timestamp, chat_id, user_id ) VALUES (:msg, :timestamp, :chat_id, :user_id);',
      args: { msg, timestamp: currentDate.toLocaleString('es-CO', {timeZone: 'America/Bogota'}), chat_id: '1', user_id: '1' }
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

