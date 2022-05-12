import express from "express";
import VerifyUserAuth from "../VerifyUserAuth.js";
import {
	RegisterUser,
	LoginUser,
	SearchUser,
} from "../Controllers/UserController.js";
const router = express.Router();

// http://localhost:5000/api/user
router.post("/", RegisterUser);
// http://localhost:5000/api/user/login
router.post("/login", LoginUser);

// http://localhost:5000/api/user?identifier=NameOrEmail
router.get("/", VerifyUserAuth, SearchUser);
export default router;
