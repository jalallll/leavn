require("dotenv").config();

const server = require("./config/server.config");

// mongodb connection
const mongo = require("./controllers/db.controller");
mongo();

//
const redis = require("./controllers/redis.controller");

//
server.listen(process.env.PORT, () => {
	console.log("Server is running on port " + process.env.PORT);
});
