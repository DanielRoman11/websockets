import express, { urlencoded } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config()

import { dbConnection } from "./db/database.js";
import auth from "./routes/user.Routes.js";
import { socketConnection } from "./websocket/socket.js";


dbConnection();

const app = express();

socketConnection();

app.use(cookieParser());
app.use(express.static(urlencoded({ extended: false  })));
app.use(logger('dev'));
app.use(express.static('public'));


app.set("/auth", auth)

let port = process.env.PORT || 3000

server.listen(port, () =>{
  console.log(`Server en el puerto: ${port}`);
});
