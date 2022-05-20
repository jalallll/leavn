const jwt = require("jsonwebtoken");

// an int value for "expiresIn" is in seconds, 60 = 1 minute
const generateAccessToken = (uid) => {
	const payload = { uid };
	const secret = process.env.ACCESS_TOKEN_SECRET;
	const options = {
		expiresIn: 60 * 30,
		audience: uid,
	};
	return jwt.sign(payload, secret, options);
};
const generateRefreshToken = (uid) => {
	const payload = { uid };
	const secret = process.env.REFRESH_TOKEN_SECRET;
	const options = {
		expiresIn: 60 * 60, // 1 hour
		audience: uid,
	};
	return jwt.sign(payload, secret, options);
};

module.exports = { generateAccessToken, generateRefreshToken };
