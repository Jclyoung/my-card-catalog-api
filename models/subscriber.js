const mongoose = require("mongoose");
const cardSchema = require("./card");

const subscriberSchema = new mongoose.Schema({
	usrId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},

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
	theme: {
		type: String,
		required: false,
		default: "default"
	}
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
