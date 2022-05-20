/*
Check if email is valid 
Check if password >= 6 characters
Check if password confirmation matches password
*/

// Validators
const { body, validationResult } = require("express-validator");

// async handler
const asyncHandler = require("express-async-handler");
const { getUserByEmail } = require("../helpers/getUser");

// Perform validation
const validateRegistration = asyncHandler(async (req, res, next) => {
	const { name, email, password, passwordConfirmation } = req.body;
	body("name", "Please enter a name").isLength({ min: 1 });
	body("email", "Please enter a valid email").isEmail();
	body("password", "Please enter a valid password").isLength({ min: 6 });
	body(
		"passwordConfirmation",
		"Please enter a valid password confirmation"
	).isLength({ min: 6 });
	body(
		"passwordConfirmation",
		"Please enter a valid password confirmation"
	).custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Password confirmation does not match password");
		}
		return true;
	});

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	// check if email exists
	const user = await getUserByEmail(email);
	if (!user) {
		res.status(201).json({ error: "User with that email does not exist" });
	}

	next();
});

module.exports = validateRegistration;
