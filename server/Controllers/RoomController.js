import asyncHandler from "express-async-handler";

import roomModel from "../Models/RoomModel.js";
import userModel from "../Models/UserModel.js";

/*

{
	"room_name": "New Physics Room",
	"participient_id": "8897789",
}

*/
const CreateRoom = asyncHandler(async (req, res) => {
	const { room_name, participant_id, user } = req.body;

	if (!room_name || !user || !participant_id) {
		res.status(400);
		throw new Error("Required fields can't be empty");
	}

	const participant_user = await userModel.findOne({ _id: participant_id });

	const chatRoom = await roomModel.create({
		name: room_name,
		creator: user,
		participants: [participant_user, user],
		admin: user,
	});
	if (chatRoom) {
		res.status(201).json({
			_id: chatRoom._id,
			name: chatRoom.name,
			creator: chatRoom.user,
			participants: chatRoom.participants,
			admin: chatRoom.admin,
		});
	} else {
		res.status(400); //if room creation fails
	}
});

/*

{
	"room_id": "yut56787yt",
}

*/
const JoinRoom = asyncHandler(async (req, res) => {
	const { room_id, user } = req.body;
	const roomExist = await roomModel.findOne({ _id: room_id });
	if (!roomExist) {
		res.status(400);
		throw new Error("A room with that name does not exist");
	} else {
		const participant_user = await userModel.findOne({ _id: user._id });
		// gives confirmation
		let updated_room = await roomModel.updateOne(
			{ _id: room_id },
			{ $addToSet: { participants: participant_user } }
		);
		updated_room = await roomModel.findOne({ _id: room_id });
		res.status(201).json({ updated_room });
	}
});

/*
[Function Description] => Query room documents by name or email

/api/user?identifier=MathRoom
*/
const QueryRooms = asyncHandler(async (req, res) => {
	const { room_name, user } = req.body;
	const rooms = await roomModel.find({
		name: { $regex: room_name, $options: "i" },
	});

	res.send(rooms);
});

const getOwnRooms = asyncHandler(async (req, res) => {
	const rooms = await roomModel.find({
		participants: req.body.user,
	});

	res.send(rooms);
});

const DeleteRoom = asyncHandler(async (req, res) => {
	const { room_id, user } = req.body;
	const roomExist = await roomModel.findOne({ _id: room_id });
	if (!roomExist) {
		res.status(400);
		throw new Error("A room with that name does not exist");
	}
	if (roomExist.admin._id != user._id) {
		res.status(400);
		throw new Error("Only room admin can delete the room");
	} else {
		const remove_user = await userModel.findOne({ _id: remove_id });
		// gives confirmation
		let deleted_room = await roomModel.remove({ _id: room_id });
		res.status(201).json({ deleted_room });
	}
});

const KickRoom = asyncHandler(async (req, res) => {
	const { room_id, remove_id, user } = req.body;
	const roomExist = await roomModel.findOne({ _id: room_id });
	if (!roomExist) {
		res.status(400);
		throw new Error("A room with that name does not exist");
	}
	if (roomExist.admin._id != user._id) {
		res.status(400);
		throw new Error("Only room admin can remove participants");
	} else {
		const remove_user = await userModel.findOne({ _id: remove_id });
		// gives confirmation
		let updated_room = await roomModel.updateOne(
			{ _id: room_id },
			{ $pull: { participants: remove_user } }
		);
		updated_room = await roomModel.findOne({ _id: room_id });
		res.status(201).json({ updated_room });
	}
});

const RenameRoom = asyncHandler(async (req, res) => {
	const { room_id, new_name, user } = req.body;
	const roomExist = await roomModel.findOne({ _id: room_id });
	if (!roomExist) {
		res.status(400);
		throw new Error("A room with that name does not exist");
	}
	if (roomExist.admin._id != user._id) {
		res.status(400);
		throw new Error("Only room admin can rename room");
	} else {
		const remove_user = await userModel.findOne({ _id: remove_id });
		// gives confirmation
		let updated_room = await roomModel.updateOne(
			{ _id: room_id },
			{ $rename: { name: new_name } }
		);
		updated_room = await roomModel.findOne({ _id: room_id });
		res.status(201).json({ updated_room });
	}
});

export {
	CreateRoom,
	JoinRoom,
	DeleteRoom,
	KickRoom,
	RenameRoom,
	QueryRooms,
	getOwnRooms,
};
