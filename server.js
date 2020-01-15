require("dotenv").config();

const express = require("express"),
	bodyParser = require("body-parser"),
	passport = require("passport"),
	mongoose = require("mongoose"),
	cors = require("cors"),
	app = express(),
	Port = 1125;

mongoose.connect(process.env.DATABASE_URL, {
	// Fixes deprecation warnings useNewUrlParser and useUnifiedTopology
	useNewUrlParser: true,
	useUnifiedTopology: true
});
// fixes deprecation warning ensureIndex
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connected to Database"));

// BodyParser Middleware
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

app.use(cors({ origin: "http://localhost:3000" }));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const cardsRouter = require("./routes/cards");
app.use("/cards", cardsRouter);

app.listen(Port, () => console.log("Server Started"));
