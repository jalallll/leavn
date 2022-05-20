const redis = require("redis");

const redisConfig = async () => {
	const client = await redis.createClient({
		url: "redis://default:39_KingRoad@redis-18600.c81.us-east-1-2.ec2.cloud.redislabs.com:18600",
	});
	const conn = await client.connect();

	if (conn) {
		console.log("Connected to redis");
	}
};

module.exports = redisConfig;
