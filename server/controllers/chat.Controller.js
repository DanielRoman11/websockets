import { io } from "../index.js";
  import { chatFunctions } from "../websocket/socket.js";

export const broadcast = (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html');

  io.on('connection', chatFunctions);
}