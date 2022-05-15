import React from "react";
import { useNavigate } from "react-router-dom";

import react, { useState, useEffect, useContext } from "react";
import { UserState } from "../Context/LoginProvider";
import { Button, Container, FormLabel, Input, Stack } from "@chakra-ui/react";

const ENDPOINT = "https://localhost:5000";

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
			<Container>
				<div class="w-full flex flex-row justify-between pb-10">
					<h1>{user.name}</h1>
					<Button onClick={logOut}>logout</Button>
				</div>
			</Container>
		</div>
	);
};

export default ChatRoom;
