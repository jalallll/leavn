const express = require("express");
const { verifyAccessToken } = require("../middleware/accessToken.verification");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { UserModel } = require("../controllers/user.controller");
const { FriendshipModel } = require("../models/friendship.model");

// All requests to this router will
// first hit this middleware
router.use(verifyAccessToken);

/*
/self/
*/

// view your profile
router.post("/", async (req, res) => {
	try {
		// parse the db for that user id and return name, username and friends list
		const user = await UserModel.findById(req.uid);
		const { username, name, email } = user;
		return res.json({ username, name, email });
	} catch (error) {
		return res.json({ error: error.message });
	}
});

router.post("/addFriend", async (req, res) => {
	// check to see if the friendship already exists
	const user = await FriendshipModel.findById(req.uid);
	const { username, name, email } = user;
	return res.json({ username, name, email });

	// if not, create a new friendship
});

router.post("/removeFriend", async (req, res) => {
	// check to see if the friendship already exists
	const user = await FriendshipModel.findById(req.uid);
	const { username, name, email } = user;
	return res.json({ username, name, email });

	// if not, return an error response
});
module.exports = router;
