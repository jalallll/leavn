const mongoose = require("mongoose");

const refreshTokenSchema = mongoose.Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		token: String,
		expires: Date,
		created: { type: Date, default: Date.now },
		createdByIp: String,
		revoked: Date,
		revokedByIp: String,
		replacedByToken: String,
	},
	{
		timestamps: true,
	}
);

const RefreshTokenModel = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshTokenModel;
