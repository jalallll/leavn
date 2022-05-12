import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
	const navigate = useNavigate();

	const [user, setUser] = useState();

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("userData"));
		setUser(userData);

		if (!userData) {
			navigate("/");
		}
	}, [navigate]);

	return (
		<LoginContext.Provider value={{ user, setUser }}>
			{children}
		</LoginContext.Provider>
	);
};

export const UserState = () => {
	return useContext(LoginContext);
};

export default LoginProvider;
