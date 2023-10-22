"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/user.Controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/register', _userController.register);
router.post('/regsiter');
router.get('/login');
router.put('/:id');
router["delete"]('/:id');
var _default = router;
exports["default"] = _default;