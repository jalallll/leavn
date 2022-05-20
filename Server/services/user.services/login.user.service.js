const bcrypt = require("bcrypt");
const asynchandler = require("express-async-handler");
const {
	generateAccessToken,
	generateRefreshToken,
} = require("../../helpers/generateToken");
const { getUserByEmail } = require("../../helpers/getUser");

// login user
const loginUser = asynchandler(async (req, res) => {
	console.log(req.body);
	const { email, password } = req.body;
	const user = await getUserByEmail(email);
	// Check if a user with that email exists
	if (!user) {
		return res
			.status(400)
			.json({ error: "User with that email does not exist" });
	}
	// Check if password is correct
	const match = await bcrypt.compare(password, user.password);
	if (match) {
		const access_token = await generateAccessToken(user._id.toString());
		const refresh_token = await generateRefreshToken(user._id.toString());
		// send access & refresh token back to client
		return res.status(200).json({
			success: true,
			message: "Login Successful",
			data: {
				uid: user._id.toString(),
				accessToken: access_token,
				refreshToken: refresh_token,
			},
		});
	}
	return res.status(400).json({ error: "Incorrect password" });
});

module.exports = loginUser;
