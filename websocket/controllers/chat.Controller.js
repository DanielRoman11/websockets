
import { io } from "../index.js";
import { chatFunctions } from "../socket.js";

export const broadcast = (req, res) => {
  io.on('connection', chatFunctions)
}
