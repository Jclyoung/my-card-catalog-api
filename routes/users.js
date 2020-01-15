const express = require("express"),
	User = require("../models/user"),
	jwt = require("jsonwebtoken"),
	bcrypt = require("bcryptjs"),
	router = express.Router(),
	keys = require("../config/keys"),
	passport = require("passport");

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
// router.get("/login", getUserByEmail, (req, res) => {
// 	res.send(res.user);
// });
router.post("/auth", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user exists
		console.log(user);
		if (!user) {
			return res.status(408).json({ emailNotFound: "Email not found" });
		}

		// Check password
		const match = bcrypt.compare(password, user.password);
		if (match) {
			// User matched
			// Create JWT Payload
			const payload = {
				id: user.id,
				name: user.name
			};
			// Sign token
			jwt.sign(
				payload,
				keys.secretOrKey,
				{
					expiresIn: 31556926
				},
				(err, token) => {
					res.json({
						success: true,
						token: "Bearer " + token
					});
				}
			);
		} else {
			return res.status(400).json({ passwordIncorrect: "Password incorrect" });
		}
	});
});

// Registration
router.post("/registration", async (req, res) => {
	const newUser = new User({
		name: req.body.name,
		displayName: req.body.displayName,
		email: req.body.email,
		password: req.body.password,
		theme: req.body.theme,
		bio: req.body.bio,
		motto: req.body.motto
	});
	// User validation
	await User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(401).json({ email: "Email already exists" });
		} else {
			User.findOne({ displayName: req.body.displayName }).then(user => {
				if (user) {
					return res
						.status(401)
						.json({ displayName: "Display name already exists" });
				}
			});
		}

		// Hash password before saving in database
		const salt = bcrypt.genSaltSync(12);
		const hash = bcrypt.hashSync(newUser.password, salt);
		newUser.password = hash;
		newUser.save().then(user => {
			return res.json(user);
		});
	});
});

// Creating one
// router.post("/", async (req, res) => {
// 	const user = new User({
// 		name: req.body.name,
// 		displayName: req.body.displayName,
// 		email: req.body.email,
// 		password: req.body.password,
// 		theme: req.body.theme,
// 		bio: req.body.bio,
// 		motto: req.body.motto
// 	});
// 	try {
// 		const newUser = await user.save();
// 		res.json(newUser);
// 	} catch (err) {
// 		//400 bad data from user
// 		res.status(400).json({ message: err.message });
// 	}
// });

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
		user = await User.findOne({ email: req.params.email });
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
