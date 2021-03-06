/*
Connect to mongo and return a mongodb instance
*/

const mongoose = require("mongoose");

const mongo = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB Connected with host: ${conn.connection.host}`);
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit();
	}
};
module.exports = mongo;
