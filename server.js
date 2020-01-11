require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Port = 1125;

mongoose.connect(process.env.DATABASE_URL, {
	//
	useNewUrlParser: true,
	useUnifiedTopology: true
});
// fixes deprecation warning ensureIndex
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);

const cardsRouter = require("./routes/cards");
app.use("/cards", cardsRouter);

app.listen(Port, () => console.log("Server Started"));
