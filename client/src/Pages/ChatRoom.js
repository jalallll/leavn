import React from "react";
import { useNavigate } from "react-router-dom";

import react, { useState, useEffect, useContext } from "react";
import { UserState } from "../Context/LoginProvider";

import { Button } from "@chakra-ui/react";
const ChatRoom = () => {
	const { user, setUser } = UserState();
	const navigate = useNavigate();

	const logOut = () => {
		localStorage.removeItem("userData");
		setUser(null);
		navigate("/");
	};

	return (
		<div>
			<h1>Chat Room</h1>
			<Button onClick={logOut}>logout</Button>
		</div>
	);
};

export default ChatRoom;
