import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer} from "node:http";
import { exit } from "node:process";
import dotenv from "dotenv";
dotenv.config()

import { db, dbConnection } from "../db/database.js";
import { timeStamp } from "node:console";

dbConnection();


const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

app.use(logger('dev'));
app.use(express.static('public'));

io.on('connection', async (socket) => {
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
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

let port = process.env.PORT || 3000

server.listen(port, () =>{
  console.log(`Server en el puerto: ${port}`);
});
