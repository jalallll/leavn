import express from "express";
import dotenv from "dotenv";

import connectMongo from "./config/db.js";

import UserRoutes from "./routes/userRoutes.js";
import RoomRoutes from "./routes/roomRoutes.js";

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
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
