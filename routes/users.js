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
// Temporary Auth
router.get("/login", getUserByEmail, (req, res) => {
	res.send(res.user);
});

// Registration




// Creating one
router.post("/", async (req, res) => {
	const user = new User({
		name: req.body.name,
		displayName: req.body.displayName,
		email: req.body.email,
		password: req.body.password,
		theme: req.body.theme,
		bio: req.body.bio,
		motto: req.body.motto
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
		res.user.displayName = req.body.displayName;
	}
	if (req.body.email != null) {
		res.user.email = req.body.email;
	}
	if (req.body.theme != null) {
		res.user.theme = req.body.theme;
	}
	if (req.body.password != null) {
		res.user.password = req.body.password;
	}
	if (req.body.bio != null) {
		res.user.bio = req.body.bio;
	}
	if (req.body.motto != null) {
		res.user.motto = req.body.motto;
	}
	try {
		await res.user.save();
		res.json("updatedUser");
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Deleting one
router.delete("/:id", getUser, async (req, res) => {
	try {
		await res.user.delete();
		res.json("Deleted user");
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getUser(req, res, next) {
	try {
		user = await User.findById(req.params.id);
		if (user == null) {
			return res.status(404).json({ message: "Cannot find user" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}

	res.user = user;
	next();
}

async function getUserByEmail(req, res, next) {
	try {
		user = await User.findOne({email: req.params.email});
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
