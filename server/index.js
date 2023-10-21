import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer} from "node:http";
import { exit } from "node:process";
import dotenv from "dotenv";

import { db, dbConnection } from "../db/database.js";
import { log } from "node:console";


dbConnection();

dotenv.config()

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
    await db.execute({
      sql: `
        SELECT * FROM messages
        WHERE id > ?`,
      args: [ socket.handshake.auth.serverOffset ?? 0 ]
    })
      .then((result) => {
        result.rows.forEach(row => 
          socket.emit('chat message', row.content, row.id.toString())
        )
      }).catch((err) => {
        console.error(err);
        exit(1)
      });
  }

  socket.on('disconnect', () => {
    console.log(`Se ha desconectado un usuario! 🙅‍♂️`);
  })

  socket.on('chat message', async(msg) => {
    await db.execute({
      sql: 'INSERT INTO messages (content) VALUES (:msg);',
      args: { msg }
    })
      .then( async result => {
        await db.execute({
          sql: `
            SELECT
              timestamp
            FROM messages
            WHERE id = (:id);
          `,
          args: { id: result.lastInsertRowid}
        })
          .then( data => {
            const fecha = new Date(data.rows[0].timestamp)

            fecha.setHours(fecha.getHours() - 5);
            
            // ! TODO: BUG IMPORANTE FECHA DE BORRA!
            io.emit('chat message', msg, result.lastInsertRowid.toString(), fecha.toLocaleTimeString())
            console.log("mensaje: ", msg, ", hora: ", fecha.toLocaleTimeString());
          })
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
