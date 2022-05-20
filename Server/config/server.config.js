const express = require("express");

// initialize express
const server = express();

// cors
const cors = require("cors");
server.use(cors(require("./cors.config")));

/* 
A middleware which will help us parse incoming request 
inputs (user inputs) to the req.body object
*/
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Routing
server.use("/user", require("../routes/user.routes"));
server.use("/auth", require("../routes/auth.routes"));

module.exports = server;
