"use strict";
require("dotenv").config();

const express = require("express"),
	mongoose = require("mongoose"),
	https = require("https"),
	path = require("path"),
	cors = require("cors"),
	fs = require("fs"),
	app = express(),
	port = 1125;

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

const httpsOptions = {
	cert: fs.readFileSync(path.join(__dirname, "ssl", "server.cert")),
	key: fs.readFileSync(path.join(__dirname, "ssl", "server.key"))
};
app.use(express.json());
app.use(cors({ origin: "https://localhost:3000" }));

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const cardsRouter = require("./routes/cards");
app.use("/cards", cardsRouter);

https
	.createServer(httpsOptions, app)
	.listen(port, () => console.log("Server Started"));
