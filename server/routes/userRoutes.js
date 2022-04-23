import express from "express";
import { RegisterUser, LoginUser } from "../Controllers/UserController.js";
const router = express.Router();

// http://localhost:5000/api/user
router.post("/", RegisterUser);
// http://localhost:5000/api/user/login
router.post("/login", LoginUser);

export default router;
