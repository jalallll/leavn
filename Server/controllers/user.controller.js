/*
Return user middleware
*/

const registerUser = require("../middleware/register.user.service");
const loginUser = require("../middleware/login.user.service");
const validateRegistration = require("../middleware/register.validation");

module.exports = { registerUser, loginUser, validateRegistration };
