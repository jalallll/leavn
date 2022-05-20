const jwt = require("jsonwebtoken");

const verifyRefreshToken = async (req, res, next) => {
	console.log("Verifying Refresh Token");

	try {
		// destructure refresh token from request body
		const { refreshToken } = req.body;

		// decode the access token to get the user id
		const decodedToken = await jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET
		);

		req.body.uid = decodedToken;
		next();
	} catch (error) {
		const error_res = `${error.name}: ${error.message}`;
		console.log(error_res);
		return res.status(401).json({
			error: error_res,
		});
	}
};

module.exports = { verifyRefreshToken };
