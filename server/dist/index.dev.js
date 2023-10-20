"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _socket = require("socket.io");

var _nodeHttp = require("node:http");

var _nodeProcess = require("node:process");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _database = _interopRequireDefault(require("../db/database.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// await db.sync()
//   .then(() =>{
//     console.log("Conexión a la Database 🙆‍♂️");
//   })
//   .catch((error) =>{
//     console.error("No hay conexión a la Database: ", error)
//     exit(1)
//   })
_dotenv["default"].config();

var app = (0, _express["default"])();
var server = (0, _nodeHttp.createServer)(app);
var io = new _socket.Server(server, {
  connectionStateRecovery: {}
});
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"]["static"]('public'));
io.on('connection', function (socket) {
  console.log("Se ha conectado un usuario!\uD83D\uDE46\u200D\u2642\uFE0F");
  socket.on('disconnect', function () {
    console.log("Se ha desconectado un usuario! \uD83D\uDE45\u200D\u2642\uFE0F");
  });
  socket.on('chat message', function _callee(msg) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            io.emit('chat message', msg); // await db.execute({
            //   sql: `INSERT INTO messages (content) VALUES (:msg)`,
            //   args: { msg }
            // })
            //   .then( result => {
            //     io.emit('chat message', msg, result.lastInsertRowid.toString())
            //     console.log("Server recibió el mensaje: ",msg);
            //   })
            //   .catch(error => {
            //     console.error("Hubo un error al enviar el mensaje: ", error);
            //   })

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  });
});
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + '/client/index.html');
});
var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log("Server en el puerto: ".concat(port));
});