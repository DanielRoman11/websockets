"use strict";

var register = function register(req, res) {
  res.sendFile(process.cwd() + '/client/login.html');
};