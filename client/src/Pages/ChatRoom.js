import React from "react";
import { useNavigate } from "react-router-dom";

import react, { useState, useEffect, useContext } from "react";
import { UserState } from "../Context/LoginProvider";

const ChatRoom = () => {
	const { user } = UserState;
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/");
		}
	}, [navigate]);
	return <div>Chat Room</div>;
};

export default ChatRoom;
