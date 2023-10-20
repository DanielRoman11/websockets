import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer} from "node:http";
import { exit } from "node:process";
import dotenv from "dotenv";

import db from "../db/database.js";


await db.sync()
  .then(() =>{
    console.log("Conexión a la Database 🙆‍♂️");
  })
  .catch((error) =>{
    console.error("No hay conexión a la Database: ", error)
    exit(1)
  })

dotenv.config()

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

app.use(logger('dev'));
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log(`Se ha conectado un usuario!🙆‍♂️`);

  socket.on('disconnect', () => {
    console.log(`Se ha desconectado un usuario! 🙅‍♂️`);
  })

  socket.on('chat message', async(msg) => {    
    await db.execute({
      sql: `INSERT INTO messages (content) VALUES (:msg)`,
      args: { msg }
    })
      .then( result => {
        io.emit('chat message', msg, result.lastInsertRowid.toString())
        console.log("Server recibió el mensaje: ",msg);
      })
      .catch(error => {
        console.error("Hubo un error al enviar el mensaje: ", error);
      })
      
  });
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

let port = process.env.PORT || 3000

server.listen(port, () =>{
  console.log(`Server en el puerto: ${port}`);
});
