const express = require("express");
const router = express.Router();
const Card = require("../models/card");

// Getting all
router.get("/:userId", async (req, res) => {
	try {
		const cards = await Card.find();
		res.json(cards);
	} catch (err) {
		// 500 something wrong with server
		res.status(500).json({ message: err.message });
	}
});

// Creating one
router.post("/:userId", async (req, res) => {
	const card = new Card({
		userId: req.body.userId,
		name: req.body.name,
		type: req.body.type,
		sport: req.body.sport,
		team: req.body.team,
		location: req.body.location,
		// add location
		printYear: req.body.printYear,
		manufacturer: req.body.manufacturer,
		original: req.body.original,
		psa: req.body.psa,
		condition: req.body.condition,
		era: req.body.era,
		graded: req.body.graded,
		grades: req.body.grades,
		notes: req.body.notes,
		description: req.body.description
	});
	try {
		const newCard = await card.save();
		res.json(newCard);
	} catch (err) {
		//400 bad data from user
		res.status(400).json({ message: err.message });
	}
});

// Updating one
router.patch("/:id/:id", getCard, async (req, res) => {
	if (req.body.name != null) {
		res.card.name = req.body.name;
	}
	if (req.body.type != null) {
		res.card.type = req.body.type;
	}
	if (req.body.sport != null) {
		req.card.sport = req.body.sport;
	}
	if (req.body.team != null) {
		req.card.team = req.body.team;
	}
	if (req.body.location != null) {
		res.card.location = req.body.location;
	}
	if (req.body.printYear != null) {
		res.card.printYear = req.body.printYear;
	}
	if (req.body.playerYear != null) {
		res.card.playerYear = req.body.playerYear;
	}
	if (req.body.manufacturer != null) {
		req.card.manufacturer = req.body.manufacturer;
	}
	if (req.body.original != null) {
		req.card.original = req.body.original;
	}
	if (req.body.psa != null) {
		res.card.psa = req.body.psa;
	}
	if (req.body.condition != null) {
		req.card.condition = req.body.condition;
	}
	if (req.body.era != null) {
		req.card.era = req.body.era;
	}
	if (req.body.graded != null) {
		res.card.graded = req.body.graded;
	}
	if (req.body.grades != null) {
		req.card.grades = req.body.grades;
	}
	if (req.body.notes != null) {
		req.card.notes = req.body.notes;
	}
	if (req.body.description != null) {
		res.card.description = req.body.description;
	}

	try {
		await res.card.save();
		res.json("updatedCard");
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Deleting one
router.delete("/:id/:id", async (req, res) => {
	try {
		await res.card.remove();
		res.json("Deleted card");
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getCard(req, res, next) {
	try {
		card = await card.findById(req.params.id);
		if (card == null) {
			return res.status(404).json({ message: "Cannot find card" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}

	res.card = card;
	next();
}

module.exports = router;
