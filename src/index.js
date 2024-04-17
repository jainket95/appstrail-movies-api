const express = require("express");
const cors = require("cors");

require("dotenv").config({ debug: true });

const router = require("./router");

const { PORT } = process.env;

const app = express();
const port = PORT || 8080;

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
	})
);

app.use("/", router);

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
