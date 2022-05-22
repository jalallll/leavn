const express = require("express");
const { verifyAccessToken } = require("../middleware/accessToken.verification");
const router = express.Router();

// All requests to this router will
// first hit this middleware
router.use(verifyAccessToken);

/*
/user/
*/
router.get("/:uid", (req, res) => {
	res.send(`protected user route with id: ${req.params.uid}`);
});

module.exports = router;
