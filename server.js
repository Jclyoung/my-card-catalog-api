require("dotenv").config();

const express = require("express"),
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

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const cardsRouter = require("./routes/cards");
app.use("/cards", cardsRouter);

app.listen(Port, () => console.log("Server Started"));
