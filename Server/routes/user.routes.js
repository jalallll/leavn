const express = require("express");
const router = express.Router();
const validateRegistration = require("../middleware/register.validation");
const { registerUser } = require("../controllers/user.controller");
const { verifyAccessToken } = require("../middleware/accessToken.verification");
const loginUser = require("../services/user.services/login.service");

/*
  * @route POST /user/register
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
    "id": "",
    "accessToken": "",
    "refreshToken": ""
  }
}
*/
router.post("/register", validateRegistration, registerUser);

/*
  * @route POST /user/login
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
    "id": "",
    "accessToken": "",
    "refreshToken": ""
  }
}
*/
router.post("/login", loginUser);

module.exports = router;
