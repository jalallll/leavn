const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const {
	generateAccessToken,
	generateRefreshToken,
} = require("../helpers/generateToken");
const UserModel = require("../models/user.model");

const registerUser = asyncHandler(async (req, res, next) => {
	const { name, email, username, password } = req.body;
	bcrypt.hash(password, 10, async (err, hash) => {
		if (err) {
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}

		try {
			const user = await UserModel.create({
				name,
				email,
				username,
				password: hash,
			});
			const uid = user._id.toString();
			req.body = { uid };
			next();
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Internal server error",
				error: err.message,
			});
		}
	});
});

module.exports = registerUser;
