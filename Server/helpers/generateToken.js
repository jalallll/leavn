const jwt = require("jsonwebtoken");

// an int value for "expiresIn" is in seconds, 60 = 1 minute
const accessToken = (id) => {
	const payload = { id };
	const secret = process.env.ACCESS_TOKEN_SECRET;
	const options = {
		expiresIn: 60 * 30,
	};
	return jwt.sign(payload, secret, options);
};
const refreshToken = (id) => {
	const payload = { id };
	const secret = process.env.REFRESH_TOKEN_SECRET;
	const options = {
		expiresIn: 60 * 60, // 1 hour
	};
	return jwt.sign(payload, secret, options);
};

module.exports = { accessToken, refreshToken };
