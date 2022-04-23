import express from "express";
import { CreateRoom, JoinRoom } from "../Controllers/RoomController.js";

const router = express.Router();

router.post("/", CreateRoom);
router.post("/join", JoinRoom);

export default router;
