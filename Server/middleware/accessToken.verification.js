const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
	const token = req.headers["authorization"];
	if (!token) {
		return res.status(401).json({
			error: "Access token is required to access this resource",
		});
	}
	// Remove "bearer" from the access token
	const accessToken = token.split(" ")[1];

	// decode the access token to get the user id
	jwt.verify(
		accessToken,
		process.env.ACCESS_TOKEN_SECRET,
		(err, decodedToken) => {
			if (err) {
				return res.status(401).json({
					error: "Invalid access token",
				});
			}
			req.user.id = decodedToken;
			next();
		}
	);

	return next();
};

module.exports = { verifyAccessToken };
