import React, { useState } from "react";
import { VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [visibility, setVisibility] = useState();
	const [name, setName] = useState();
	const [password, setPassword] = useState();
	const [email, setEmail] = useState();

	// initialize navigate hook
	const navigate = useNavigate();

	// Function to submit form
	const SubmitForm = async () => {
		// if any field is empty, then create a popup error message
		if (!name || !password || !email) {
			alert("Fields cant be empty");
		}

		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			// send api request to server
			const { data } = await axios.post(
				"/api/user",
				{ name, email, password },
				config
			);
			console.log(`Data: ${data}`);
			// change url
			navigate("/chat");
			// catch block (display error message)
		} catch (error) {
			console.log(error);
		}
	};

	// return signup form
	return (
		<VStack spacing="10px">
			<FormControl id="name" isRequired>
				<Input
					placeholder="Name"
					onChange={(name) => setName(name.target.value)}
				/>
			</FormControl>
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
				Sign Up!
			</Button>
		</VStack>
	);
};

export default Signup;
