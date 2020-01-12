const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Getting all
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		// 500 something wrong with server
		res.status(500).json({ message: err.message });
	}
});
// Getting one
router.get("/:id", getUser, (req, res) => {
	res.send(res.user);
});

// Creating one
router.post("/", async (req, res) => {
	const user = new User({
		name: req.body.name,
		displayName: req.body.displayName,
		email: req.body.email
	});
	try {
		const newUser = await user.save();
		res.json(newUser);
	} catch (err) {
		//400 bad data from user
		res.status(400).json({ message: err.message });
	}
});

// Updating one
router.patch("/:id", getUser, async (req, res) => {
	if (req.body.name != null) {
		res.user.name = req.body.name;
	}
	if (req.body.displayName != null) {
		req.user.displayName = req.body.displayName;
	}
	if (req.body.email != null) {
		req.user.email = req.body.email;
	}
	try {
		await res.user.save();
		res.json("updatedUser");
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Deleting one
router.delete("/:id", async (req, res) => {
	try {
		await res.user.remove();
		res.json("Deleted user");
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getUser(req, res, next) {
	try {
		user = await user.findById(req.params.id);
		if (user == null) {
			return res.status(404).json({ message: "Cannot find user" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}

	res.user = user;
	next();
}

module.exports = router;
