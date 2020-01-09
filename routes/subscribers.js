const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

// Getting all
router.get("/", async (req, res) => {
	try {
		const subscribers = await Subscriber.find();
		res.json(subscribers);
	} catch (err) {
		// 500 something wrong with server
		res.status(500).json({ message: err.message });
	}
});
// Getting one
router.get("/:id", getSubscriber, (req, res) => {
	res.send(res.subscriber);
});

// Creating one
router.post("/", async (req, res) => {
	const subscriber = new Subscriber({
		name: req.body.name,
		displayName: req.body.displayName,
		email: req.body.email
	});
	try {
		const newSubscriber = await subscriber.save();
		res.json(newSubscriber);
	} catch (err) {
		//400 bad data from user
		res.status(400).json({ message: err.message });
	}
});

// Updating one
router.patch("/:id", getSubscriber, async (req, res) => {
	if (req.body.name != null) {
		res.subscriber.name = req.body.name;
	}
	if (req.body.displayName != null) {
		req.subscriber.displayName = req.body.displayName;
	}
	if (req.body.email != null) {
		req.subscriber.email = req.body.email;
	}
	try {
		await res.subscriber.save();
		res.json("updatedSubscriber");
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Deleting one
router.delete("/:id", async (req, res) => {
	try {
		await res.subscriber.remove();
		res.json("Deleted subscriber");
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getSubscriber(req, res, next) {
	try {
		subscriber = await subscriber.findById(req.params.id);
		if (subscriber == null) {
			return res.status(404).json({ message: "Cannot find subscriber" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}

	res.subscriber = subscriber;
	next();
}

module.exports = router;
