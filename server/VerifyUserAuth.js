import jwt from "jsonwebtoken";
import userModel from "./Models/UserModel.js";
import asyncHandler from "express-async-handler";

const VerifyUserAuth = asyncHandler(async (req, res, next) => {
	if (
		// if request has an auth header (token) and it is a bearer token
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			const token = req.headers.authorization.split(" ")[1];
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
			req.body.user = await userModel
				.findById(decodedToken.id)
				.select("-password");
			next();
		} catch (error) {
			res.status(401);
			throw new Error("Authorization Failed");
		}
	} else {
		res.status(401);
		throw new Error("Authorization Failed");
	}
});

export default VerifyUserAuth;
