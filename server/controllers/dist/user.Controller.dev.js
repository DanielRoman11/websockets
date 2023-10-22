"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = void 0;

var register = function register(req, res) {
  res.sendFile(process.cwd() + '/client/register.html');
};

exports.register = register;