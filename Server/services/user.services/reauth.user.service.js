const {
	generateAccessToken,
	generateRefreshToken,
} = require("../../helpers/generateToken");

const reauthenticateUser = (req, res) => {
	const { refreshToken, uid } = req.body;
	// in redis, blacklist the refresh token
	// redis.blacklist(refreshToken);

	// generate new access token
	const access_token = generateAccessToken(uid);

	// generate new refresh token
	const refresh_token = generateRefreshToken(uid);

	// store new refresh token into redis
	// redis.store(refresh_token)

	// send access & refresh token back to client
	return res.status(200).json({
		success: true,
		message: "Reauthenticated successfully",
		data: {
			uid,
			accessToken: access_token,
			refreshToken: refresh_token,
		},
	});
};

module.exports = reauthenticateUser;
