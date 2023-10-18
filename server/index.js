import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer} from "node:http";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(logger('dev'));
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log(`Se ha conectado un usuario!🙆‍♂️`);

  socket.on('disconnect', () => {
    console.log(`Se ha desconectado un usuario! 🙅‍♂️`);
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('custom-event', (data) => {
    // Emitir el evento a todos los clientes conectados (broadcast)
    io.emit('custom-event', data);
  });
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

let port = process.env.PORT || 3000

server.listen(port, () =>{
  console.log(`Server en el puerto: ${port}`);
});
