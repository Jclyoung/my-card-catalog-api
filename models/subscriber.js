const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
	usrId: {
		type: String,
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

	Catalog: {
		type: Array
		
	},

	theme: {
		type: String,
		required: false,
		default: "default"
	}
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
