const mongoose = require("../mongoose");

const userOptions = {
	discriminatorKey: "userType", // discriminator key
	collection: "users", // collection name
	timestamps: true,
};

const userSchema = mongoose.model(
	"userSchema",
	new mongoose.Schema(
		{
			firstName: String,
			lastName: String,
			phone: String,
			email: String,
			password: String,
			role: Array,
			profilePicture: String,
		},
		userOptions
	)
);
module.exports = mongoose.model("userSchema");
