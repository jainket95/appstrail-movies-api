const express = require("express");
const {
	getMovies,
	createMovie,
	updateMovie,
	deleteMovie,
} = require("../controller");

const router = express.Router();

router.get("/movies", getMovies);
router.post("/movie", createMovie);
router.put("/movie/:id", updateMovie);
router.delete("/movie/:id", deleteMovie);

module.exports = router;
