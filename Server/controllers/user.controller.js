/*
Return user middleware
*/

const registerUser = require("../middleware/register.user.service");
const loginUser = require("../middleware/login.user.service");
const validateRegistration = require("../middleware/register.validation");
const UserModel = require("../models/user.model");

module.exports = { registerUser, loginUser, validateRegistration, UserModel };
