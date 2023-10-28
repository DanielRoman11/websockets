
import { io } from "../index.js";
import { chatFunctions } from "../socket.js";

export const broadcast = (req, res) => {
  io.on('connection', chatFunctions)
  // async(socket) => {
    // console.log(`Se ha conectado un usuario!🙆‍♂️`);
    // socket.setMaxListeners(1)
  
    // socket.on('disconnect', () => {
    //   ActiveSockets.delete(socket);
    //   console.log(`Se ha desconectado un usuario! 🙅‍♂️`);
    // });

    // socket.on('chat message', async(msg) => {
    //   const currentDate = new Date();

    //   await db.execute({
    //     sql: 'INSERT INTO messages (content, timestamp, chat_id, user_id ) VALUES (:msg, :timestamp, :chat_id, :user_id);',
    //     args: { msg, timestamp: currentDate.toLocaleString('es-CO', {timeZone: 'America/Bogota'}), chat_id: '2', user_id: '1' }
    //   })
    //     .then(result => {
    //       socket.emit('chat message', msg, result.lastInsertRowid.toString(), currentDate.toLocaleTimeString('es-CO', {timeZone: 'America/Bogota'}))

    //       console.log("mensaje: ", msg, ", hora: ", currentDate.toLocaleTimeString('es-CO', {timeZone: 'America/Bogota'}));
    //     })
    //     .catch(error => {
    //       console.error("Hubo un error al enviar el mensaje: ", error);
    //     });
    //   });
    
    
    // if (!socket.recovered) {
    //   await db.execute(
    //     `SELECT * FROM messages WHERE id > (:offset)`,
    //     [socket.handshake.auth.serverOffset ?? 0 ],
    //     (_err, row) => {
    //       io.emit('chat message', row.content, row.id.toString(), row.timestamp.slice(12))})
    //       .catch((err) => {
    //         console.error(err)
    //       })
    // }
  // })
}
