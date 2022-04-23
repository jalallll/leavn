import express from "express";
import {
	CreateRoom,
	JoinRoom,
	DeleteRoom,
	KickRoom,
	RenameRoom,
	QueryRooms,
	getOwnRooms,
} from "../Controllers/RoomController.js";
import VerifyUserAuth from "../VerifyUserAuth.js";

const router = express.Router();

// http://localhost:5000/api/room
router.post("/", VerifyUserAuth, CreateRoom);
router.get("/", VerifyUserAuth, getOwnRooms);
router.post("/search", VerifyUserAuth, QueryRooms);
router.put("/join", VerifyUserAuth, JoinRoom);
router.put("/delete", VerifyUserAuth, DeleteRoom);
router.put("/kick", VerifyUserAuth, KickRoom);
router.put("/rename", VerifyUserAuth, RenameRoom);

export default router;
