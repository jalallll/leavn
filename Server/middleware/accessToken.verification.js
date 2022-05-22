/*
Decode the jwt access token
*/

const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");

const verifyAccessToken = asynchandler(async (req, res, next) => {
	console.log("Verifying Access Token");

	if (!req.headers.authorization) {
		return res.status(401).json({
			error: "Access token is required to access this resource",
		});
	}

	try {
		// Remove "bearer" from the access token
		const accessToken = req.headers.authorization.split(" ")[1];
		// decode the access token to get the user id
		const decodedToken = jwt.verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET
		);

		req.uid = decodedToken;
		next();
	} catch (error) {
		const error_res = `${error.name}: ${error.message}`;
		console.log(error_res);
		return res.status(401).json({
			error: error_res,
		});
	}
});

module.exports = { verifyAccessToken };
