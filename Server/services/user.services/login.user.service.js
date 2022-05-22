const bcrypt = require("bcrypt");
const asynchandler = require("express-async-handler");
const {
	generateAccessToken,
	generateRefreshToken,
} = require("../../helpers/generateToken");
const { getUserByEmail } = require("../../helpers/getUserByEmail");

// login user
const loginUser = asynchandler(async (req, res, next) => {
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
	if (!match) {
		return res.status(400).json({ error: "Incorrect password" });
	}

	const uid = user._id.toString();
	req.body.uid = uid;
	next();
});

module.exports = loginUser;
