const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET;
const refresh_token_expiration = process.env.REFRESH_TOKEN_EXPIRATION;
const redis_port = process.env.REDIS_PORT;
const redis_host = process.env.REDIS_HOST;
const redis_password = process.env.REDIS_PASSWORD;
const redis_username = process.env.REDIS_USERNAME;

module.exports = {
	port,
	mongoURI,
	access_token_secret,
	refresh_token_secret,
	refresh_token_expiration,
	redis_port,
	redis_host,
	redis_password,
	redis_username,
};
