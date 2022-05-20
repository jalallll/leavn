const bcrypt = require("bcrypt");

const registerUser = require("../services/user.services/register.service");
const loginUser = require("../services/user.services/login.service");

module.exports = { registerUser, loginUser };
