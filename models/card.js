const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
	type: Object,
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	sport: {
		type: String,
		required: true
	},
	player: {
		type: Object,
		name: {
			type: String
		}
	},
	team: {
		type: String
	},
	playerYear: {
		type: String
	},
	location: {
		type: String
		// type: Object,
		// primary: {
		// 	type: String
		// },
		// primaryName: {
		// 	type: String
		// },
		// secondary: {
		// 	type: String
		// },
		// secondaryName: {
		// 	type: String
		// },
		// tertiary: {
		// 	type: String
		// },
		// tertiaryName: {
		// 	type: String
		// }
	},
	printYear: {
		type: String
	},
	manufacturer: {
		type: String
	},
	original: {
		type: String
	},
	psa: {
		type: String
	},
	condition: {
		type: String
	},
	era: {
		type: String
	},
	graded: {
		type: String
	},
	grades: {
		type: String
	},
	notes: {
		type: String
	},
	description: {
		type: String
	}
});

module.exports = mongoose.model("Card", cardSchema);
