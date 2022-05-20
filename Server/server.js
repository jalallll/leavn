require("dotenv").config();

const server = require("./config/server.config");

// mongodb connection
const mongo = require("./config/mongo.config");
mongo();

//
const redisConfig = require("./config/redis.config");
redisConfig();
//
server.listen(process.env.PORT, () => {
	console.log("Server is running on port " + process.env.PORT);
});

// redis://default:39_KingRoad@redis-18600.c81.us-east-1-2.ec2.cloud.redislabs.com:18600
