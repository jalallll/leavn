/*
Generate access and refresh tokens
*/

const jwt = require("jsonwebtoken");

const generateAccessToken = (uid) => {
	const payload = { uid };
	const secret = process.env.ACCESS_TOKEN_SECRET;
	const options = {
		expiresIn: 60 * 5, // in seconds, 5 minutes
		audience: uid,
	};
	return jwt.sign(payload, secret, options);
};
const generateRefreshToken = (uid) => {
	const payload = { uid };
	const secret = process.env.REFRESH_TOKEN_SECRET;
	const options = {
		audience: uid,
	};
	return jwt.sign(payload, secret, options);
};

module.exports = { generateAccessToken, generateRefreshToken };
