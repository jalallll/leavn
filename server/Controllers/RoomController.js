import asyncHandler from "express-async-handler";

import roomModel from "../Models/RoomModel.js";
import userModel from "../Models/UserModel.js";

/*

{
	"name": "John Doe",
	"creator": "John Doe",
	"participants": 
	"admin": "John Doe"
}

*/
const CreateRoom = asyncHandler(async (req, res) => {
	const { name, creator, participants, admin } = req.body;

	// if any field is empty then throw an error
	if (!name || !creator || !participants || !admin) {
		res.status(400);
		throw new Error("Required fields can't be empty");
	}
	const roomExist = await roomModel.findOne({ name });
	if (roomExist) {
		res.status(400);
		throw new Error("A room with that name already exists");
	}
	if (participants.length < 2) {
		res.status(400);
		throw new Error("Need atleast 2 participants in room");
	} else {
		const chatRoom = await roomModel.create({
			name,
			creator,
			participants,
			admin,
		});
		if (chatRoom) {
			res.status(201).json({
				_id: chatRoom._id,
				name: chatRoom.name,
				creator: chatRoom.creator,
				participants: chatRoom.participants,
				admin: chatRoom.admin,
			});
		} else {
			res.status(400); //if room creation fails
		}
	}
});

const JoinRoom = asyncHandler(async (req, res) => {
	const { room_name, user_name } = req.body;
	const roomExist = await roomModel.findOne({ room_name });
	const userExist = await userModel.findOne({ user_name });
	if (!roomExist) {
		res.status(400);
		throw new Error("A room with that name does not exist");
	}
});

export { CreateRoom, JoinRoom };
