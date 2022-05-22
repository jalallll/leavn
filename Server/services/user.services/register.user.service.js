const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const {
	generateAccessToken,
	generateRefreshToken,
} = require("../../helpers/generateToken");
const UserModel = require("../../models/user.model");

const registerUser = asyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body;
	bcrypt.hash(password, 10, async (err, hash) => {
		if (err) {
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
		const user = await UserModel.create({
			name,
			email,
			password: hash,
		});

		if (!user) {
			res.status(401); //if user creation fails
		}

		const uid = user._id.toString();
		req.body = { uid };
		next();
	});
});

module.exports = registerUser;
