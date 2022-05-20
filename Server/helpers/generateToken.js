const jwt = require("jsonwebtoken");

// expiresIn is in seconds
const accessToken = (id) => {
	return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: 60 * 1,
	});
};
const refreshToken = (id) => {
	return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: 60 * 60,
	});
};

module.exports = { accessToken, refreshToken };
