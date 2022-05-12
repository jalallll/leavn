import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home.js";
import ChatRoom from "./Pages/ChatRoom.js";

import react, { useState, useEffect } from "react";
import LoginProvider from "./Context/LoginProvider.js";

function App() {
	return (
		<LoginProvider>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/chat" element={<ChatRoom />} />
			</Routes>
		</LoginProvider>
	);
}

export default App;
