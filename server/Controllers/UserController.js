import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import userModel from "../Models/UserModel.js";

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

/*
[Function Description] => Register User

[API EndPoint] => https:localhost:5000/user/

[Input Json] => {  "name": "Bob John",
                "email": "Bob@gmail.com",
                "password": "password123" }

*/
const RegisterUser = asyncHandler(async (req, res) => {
	console.log("Reg user");
	const { name, email, password } = req.body;

	// if any field is empty then throw an error
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Fields can't be empty");
	}

	// check if email exists
	const userExist = await userModel.findOne({ email });
	if (userExist) {
		res.status(400);
		throw new Error("A user with that email already exists");
	}
	// Create a new user account (if email unique)
	else {
		const user = await userModel.create({ name, email, password });
		// if user successfully created
		if (user) {
			const token = generateToken(user._id);
			console.log(`Token: ${token}`);
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: token, //send json web token
			});
		} else {
			res.status(400); //if user creation fails
		}
	}
});

/*
[Function Description] => Login a pre-existing user

[API EndPoint] => https:localhost:5000/user/

[Input Json] => {  "email": "Bob@gmail.com",
                "password": "password123" }

*/
const LoginUser = asyncHandler(async (req, res) => {
	// extract email and password from request body
	const { email, password } = req.body;
	console.log(`login user ${email} ${password}`);

	// Throw error if email and password fields empty
	if (!email || !password) {
		res.status(400);
		throw new Error("Fields can't be empty");
	}

	// check if user email exists
	const userExist = await userModel.findOne({ email: email });

	// if user email exists and passwords match
	if (userExist && (await userExist.matchPassword(password))) {
		res.json({
			_id: userExist._id,
			name: userExist.name,
			email: userExist.email,
			isAdmin: userExist.isAdmin,
			token: generateToken(userExist._id),
		});
	} else {
		// if a user with that email does not exist
		if (!userExist) {
			res.status(401);
			throw new Error("A user with that email DOES NOT exist");
		}
		// if the password in request body does not match password in database
		else {
			res.status(401);
			throw new Error("Incorrect Password");
		}
	}
});
/*
[Function Description] => Query user documents by name or email

/api/user?identifier=John
*/
const SearchUser = asyncHandler(async (req, res) => {
	const identifier = req.query.identifier;
	console.log(identifier);
	const users = await userModel
		.find({
			$or: [
				{ name: { $regex: identifier, $options: "i" } },
				{ email: { $regex: identifier, $options: "i" } },
			],
		})
		.find({ _id: { $ne: req.body.user._id } }); // dont include the user requesting the query in the result

	res.send(users);
});
export { RegisterUser, LoginUser, SearchUser };
