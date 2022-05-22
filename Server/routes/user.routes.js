const express = require("express");
const { verifyAccessToken } = require("../middleware/accessToken.verification");
const router = express.Router();

// All requests to this router will
// first hit this middleware
router.use(verifyAccessToken);

/*
/user/
*/

// view the profile of this specific user
router.get("/:username", (req, res) => {
	res.send(`protected user route with username: ${req.params.username}`);
});

module.exports = router;
