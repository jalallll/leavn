const express = require("express");
const router = express.Router();
const registerValidation = require("../middleware/register.validation");
const { registerUser } = require("../controllers/user.controller");

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
  "success": boolean,
  "message": "",
  "data": {
    "id": "",
    "accessToken": "",
    "refreshToken": ""
  }
}
*/
router.post("/register", registerValidation, registerUser);

module.exports = router;
