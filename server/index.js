import express, { urlencoded } from "express";
import { Server } from "socket.io";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { createServer } from 'node:http';
import dotenv from "dotenv";
import csurf from "csurf";
dotenv.config()

import { dbConnection } from "./db/database.js";
import auth from "./routes/user.Routes.js";
import chat from "./routes/chat.Routes.js";


dbConnection();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.use(logger('dev'));
app.use(csurf({ cookie: true  }));

app.use("/api/auth", auth);
app.use("/api/broadcast", chat);

const server = createServer(app);
export const io = new Server(server, {
  connectionStateRecovery: {}
}); 

const port = process.env.PORT || 3000
server.listen(port, () =>{
  console.log(`Server en el puerto: ${process.env.BACKEND_URL}:${port}`);
});
