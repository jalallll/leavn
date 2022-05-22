/*
  Save refresh token into redis
*/

const redis = require("../controllers/redis.controller");
const {
	generateAccessToken,
	generateRefreshToken,
} = require("../helpers/generateToken");

const saveRefreshToken = async (req, res) => {
	const { uid } = req.body;
	const access_token = generateAccessToken(uid);
	const refresh_token = generateRefreshToken(uid);
	console.log(`ref token again ${refresh_token}`);

	redis.setex(
		uid,
		process.env.REFRESH_TOKEN_EXPIRATION,
		refresh_token,
		(err, reply) => {
			if (err) {
				return res.status(500).json({
					success: false,
					message: "Internal server error",
					error: err,
				});
			}
			return res.status(200).json({
				success: true,
				message: "Refresh token saved successfully",
				data: {
					refresh_token,
					access_token,
					uid,
				},
			});
		}
	);
};

module.exports = saveRefreshToken;
