const mongoose = require("mongoose");
const cardSchema = require("./card");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},

	displayName: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},

	password: {
		type: String,
		required: true
	},

	bio: {
		type: String
	},

	motto: {
		type: String
	},

	theme: {
		type: String,
		required: false,
		default: "default"
	}
});

module.exports = mongoose.model("User", userSchema);
