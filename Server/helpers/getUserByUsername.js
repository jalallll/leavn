const UserModel = require("../models/user.model");

const asyncHandler = require("express-async-handler");

getUserByUsername = asyncHandler(async (username) => {
	const userExist = await UserModel.findOne({ username });
	if (userExist) {
		return userExist;
	}
	return null;
});

module.exports = { getUserByEmail };
