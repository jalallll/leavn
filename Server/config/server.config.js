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
const userRoute = require("../routes/user.routes");
server.use("/user", userRoute);

module.exports = server;
