const UserModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");
getUserByEmail = asyncHandler(async (email) => {
	const userExist = await UserModel.findOne({ email });
	if (userExist) {
		return userExist;
	}
	return null;
});

module.exports = { getUserByEmail };
