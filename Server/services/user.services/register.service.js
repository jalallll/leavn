const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const { accessToken, refreshToken } = require("../../helpers/generateToken");
const UserModel = require("../../models/user.model");

const registerUser = asyncHandler(async (req, res) => {
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

		const access_token = await accessToken(user._id.toString());
		const refresh_token = await refreshToken(user._id.toString());

		if (user) {
			res.status(201).json({
				success: true,
				message: "User created successfully",
				data: {
					id: user._id.toString(),
					accessToken: access_token,
					refreshToken: refresh_token,
				},
			});
		} else {
			res.status(401); //if user creation fails
		}
	});
});

module.exports = registerUser;
