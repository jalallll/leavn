import React, { useState, useContext, useEffect } from "react";
import { VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { UserState } from "../Context/LoginProvider";

const Login = () => {
	// initialize navigate hook
	const navigate = useNavigate();

	const [password, setPassword] = useState();
	const [email, setEmail] = useState();
	const [visibility, setVisibility] = useState();

	// Function to submit form
	const SubmitForm = async () => {
		// get global user state from context
		const { user, setUser } = UserState();

		// pop up msg if fields empty
		if (!password || !email) {
			alert("Fields cant be empty");
		}

		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			// login using the email & password
			const { data } = await axios.post(
				"/api/user/login",
				{ email, password },
				config
			);
			// save user data into local storage
			localStorage.setItem("userData", JSON.stringify(data));

			// pass user data into context (make it global state)
			const us = JSON.parse(localStorage.getItem("userData"));
			setUser(us);
			console.log(`login page ${user} ${us}`);
			navigate("/chat");
		} catch (error) {
			console.log(error);
		}
	};

	// Return login form
	return (
		<VStack spacing="10px">
			<FormControl id="email" isRequired>
				<Input
					placeholder="Email"
					onChange={(email) => setEmail(email.target.value)}
				/>
			</FormControl>
			<FormControl id="password" isRequired>
				<InputGroup>
					<Input
						placeholder="Password"
						type={visibility ? "text" : "password"}
						onChange={(password) => setPassword(password.target.value)}
					/>
					<InputRightElement width="4.5rem">
						<Button
							h="1.75 rem"
							size="sm"
							onClick={(click) => setVisibility(!visibility)}
						>
							{visibility ? "Hide" : "Show"}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<Button
				colorScheme="blue"
				width="100%"
				style={{ marginTop: 15 }}
				onClick={SubmitForm}
			>
				Log In!
			</Button>
		</VStack>
	);
};

export default Login;
