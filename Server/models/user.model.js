const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			required: true,
			type: String,
			trim: true,
		},
		email: {
			required: true,
			type: String,
			trim: true,
			unique: true,
		},
		username: {
			required: true,
			type: String,
			trim: true,
			unique: true,
		},
		password: {
			required: true,
			type: String,
			trim: true,
		},
		created: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	}
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
