import express from "express";
import { Server } from "socket.io";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { createServer } from 'node:http';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()

import { dbConnection } from "./db/database.js";
import auth from "./routes/user.Routes.js";
import chat from "../websocket/routes/chat.Routes.js";


dbConnection();

const app = express();
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.use(logger('dev'));
app.use(cors({
  origin: `${process.env.BACKEND_URL}`,
  optionsSuccessStatus: 200 || 204
}));

app.use("/api/users", auth);
// app.use("/broadcast", chat);

const server = createServer(app);
export const io = new Server(server, {
  connectionStateRecovery: {}
}); 

server.listen(port, () =>{
  console.log(`Server en el puerto: ${process.env.BACKEND_URL}`);
});
