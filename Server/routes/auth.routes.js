const express = require("express");
const router = express.Router();
const {
	registerUser,
	loginUser,
	validateRegistration,
} = require("../controllers/user.controller");
const saveRefreshToken = require("../middleware/saveRefreshToken");

//  Routes

/*
  * @route POST /auth/register
  * @desc Register a user
  * @access Public
  

Input: 
{
  "name": "",
  "email": "",
  "password": "",
  "passwordConfirmation": ""
}

Output:
{
  "success": true,
  "message": "",
  "data": {
    "uid": "",
    "accessToken": "",
    "refreshToken": ""
  }
}
*/

// Register new user
router.post("/register", validateRegistration, registerUser, saveRefreshToken);

/*
  * @route POST /auth/login
  * @desc Login a user
  * @access Public
  

Input: 
{
  "email": "",
  "password": "",
}

Output:
{
  "success": true,
  "message": "",
  "data": {
    "uid": "",
    "accessToken": "",
    "refreshToken": ""
  }
}
*/

// Login user
router.post("/login", loginUser, saveRefreshToken);

// export router
module.exports = router;
