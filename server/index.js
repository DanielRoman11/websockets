import express, { urlencoded } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config()

import { dbConnection } from "./db/database.js";
import auth from "./routes/user.Routes.js";
import { socketConnection } from "./websocket/socket.js";
import csurf from "csurf";


dbConnection();
socketConnection();

const app = express();

app.use(express.static(urlencoded({ extended: false  })));
app.use(cookieParser());
app.use(express.json());
app.use(logger('dev'));
app.use(express.static('public'));
app.use(csurf({ cookie: true  }));

app.set("/auth", auth);

const port = process.env.PORT || 3000
server.listen(port, () =>{
  console.log(`Server en el puerto: ${process.env.BACKEND_URL}${port}`);
});
