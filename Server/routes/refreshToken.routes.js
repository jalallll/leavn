const express = require("express");
const {
	verifyRefreshToken,
} = require("../middleware/refreshToken.verification");
const reauthenticateUser = require("../middleware/reauth.user.service");
const router = express.Router();

// All requests to this router will
// first hit this middleware
router.use(verifyRefreshToken);

// get new access token & revoke old refresh token
router.post("/", reauthenticateUser);

module.exports = router;
