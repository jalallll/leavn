import React, { useState, useEffect, useContext } from "react";
import {
	Container,
	Box,
	Text,
	Tab,
	Tabs,
	TabPanel,
	TabPanels,
	TabList,
} from "@chakra-ui/react";

import Login from "../Components/Login";
import Signup from "../Components/Signup";
import { LoginContext } from "../Context/LoginProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	const userData = JSON.parse(localStorage.getItem("userData"));

	useEffect(() => {
		console.log(`home user ${userData}`);
		if (userData) {
			navigate("/chat");
		}
	}, [navigate]);

	return (
		<Container maxW="xl" centerContent>
			<Box
				d="flex"
				justifyContent="center"
				bg="white"
				w="100%"
				boxShadow="dark-lg"
				p={3}
				m="40px 0 15px 0"
				borderRadius="lg"
				borderWidth="1px"
			>
				<Text fontSize="4xl">Study Bunny</Text>
			</Box>
			<Box
				bg="white"
				w="100%"
				boxShadow="dark-lg"
				p={3}
				borderRadius="lg"
				borderWidth="1px"
			>
				<Tabs variant="soft-rounded" colorScheme="blue">
					<TabList>
						<Tab width="50%">Log In</Tab>
						<Tab width="50%">Sign Up</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Login />
						</TabPanel>
						<TabPanel>
							<Signup />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Container>
	);
};

export default Home;
