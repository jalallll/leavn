const mongoose = require("mongoose");

const FriendshipSchema = mongoose.Schema(
	{
		sender: {
			required: true,
			type: String,
			trim: true,
		},
		receiver: {
			required: true,
			type: String,
			trim: true,
		},
		accepted: {
			required: true,
			type: Boolean,
		},
		created: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	}
);

const FriendshipModel = mongoose.model("Friendship", FriendshipSchema);

module.exports = FriendshipModel;
