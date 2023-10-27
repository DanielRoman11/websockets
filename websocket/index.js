import express from "express";
import { Server } from "socket.io";
import logger from "morgan";
import { createServer } from 'node:http';
import dotenv from "dotenv";
dotenv.config()

import { dbConnection } from "./db/database.js";
import chat from "./routes/chat.Routes.js";


dbConnection();

const app = express();
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(logger('dev'));

app.use("/broadcast", chat);

const server = createServer(app);
export const io = new Server(server, {
  connectionStateRecovery: {}
}); 

server.listen(port, () =>{
  console.log(`Server en el puerto: ${process.env.BACKEND_URL}`);
});
