require("dotenv").config();

const server = require("./config/server.config");

const mongo = require("./config/mongo.config");
mongo();

server.listen(process.env.PORT, () => {
	console.log("Server is running on port " + process.env.PORT);
});
