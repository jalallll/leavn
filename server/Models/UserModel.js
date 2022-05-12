import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
		password: {
			required: true,
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (inputtedPassword) {
	// compare inputted password and stored password
	return await bcrypt.compare(inputtedPassword, this.password);
};

// encrypt password before save
userSchema.pre("save", async function (next) {
	if (!this.isModified) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);

export default User;
