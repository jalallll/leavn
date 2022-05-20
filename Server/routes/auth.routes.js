const express = require("express");
const { verifyAccessToken } = require("../middleware/accessToken.verification");
const router = express.Router();

// All requests to this router will
// first hit this middleware
router.use(verifyAccessToken);

// get news feed
router.get("/feed", (req, res) => {
	res.send("feed");
});

module.exports = router;
