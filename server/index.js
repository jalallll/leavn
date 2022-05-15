import express from "express";
import dotenv from "dotenv";
import connectMongo from "./config/db.js";
import UserRoutes from "./routes/userRoutes.js";
import RoomRoutes from "./routes/roomRoutes.js";
import { Server } from "socket.io";
import cors from "cors";

// setup config file
dotenv.config();

// start express server
const app = express();
app.use(express.json()); // server accepts json

// connect to mongo db
connectMongo();

// api end points
app.use("/api/user", UserRoutes);
app.use("/api/room", RoomRoutes);

// initialize port for listening
const port = process.env.PORT || 5000;

// listen for connections
const server = app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

// Socket io
const io = new Server(server, {
	cors: {
		origin: "https://localhost:3000",
	},
});

io.on("connection", (socket) => {
	console.log("a user connected");
});
