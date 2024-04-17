const { fetchAndInsertMovies } = require("../utils");
const { client } = require("../db");
const moviesJson = require("../utils/movies.json");
const { v4 } = require("uuid");

const { DB_TABLE_NAME } = process.env;

async function onInit() {
	let checkExistence = await client.query(
		`SELECT EXISTS (SELECT FROM pg_tables WHERE tablename = 'movies')`
	);

	if (!!checkExistence.rows[0].exists) return;
	fetchAndInsertMovies(moviesJson)
		.then(() =>
			console.log("movies fetched and inserted successfully in the database")
		)
		.catch((error) =>
			console.error(
				"Something went wrong either fetching or inserting movies in the database",
				error
			)
		);
}

onInit();

const getMovies = async (req, res) => {
	try {
		const movies = await client.query("SELECT * FROM movies");
		return res.status(200).json(movies.rows);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ isSuccess: false, ...error });
	}
};

const createMovie = async (req, res) => {
	try {
		const { movieBody, id } = req.body;
		const movieAlreadyExists = await client.query(
			"select * from movies where id = $1",
			[id]
		);
		if (movieAlreadyExists.rows.length > 0) {
			return res.json({
				isSuccess: false,
				msg: "movie already present with id : ",
				id,
			});
		}
		await client.query(
			`INSERT INTO ${DB_TABLE_NAME} (id, movie) VALUES ($1, $2)`,
			[id, movieBody]
		);
		return res.status(201).json({
			isSuccess: true,
			movie: { id, ...movieBody },
			msg: "movie added successfully",
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({ isSuccess: false, ...error });
	}
};

const updateMovie = async (req, res) => {
	try {
		const { id } = req.params;
		const { movieBody } = req.body;
		const movieAlreadyExists = await client.query(
			"select * from movies where id = $1",
			[id]
		);
		if (!movieAlreadyExists.rows.length > 0) {
			return res.json({
				isSuccess: false,
				msg: "movie not found with id : ",
				id,
			});
		}
		await client.query(`UPDATE ${DB_TABLE_NAME} SET movie = $1 WHERE id = $2`, [
			movieBody,
			id,
		]);
		return res.status(200).json({
			isSuccess: true,
			msg: "movie updated successfully",
		});
	} catch (error) {
		return res.status(400).json({
			isSuccess: false,
			...error,
		});
	}
};
const deleteMovie = async (req, res) => {
	try {
		const { id } = req.params;
		await client.query(`DELETE FROM ${DB_TABLE_NAME} WHERE id = $1`, [id]);
		const movieAlreadyExists = await client.query(
			"select * from movies where id = $1",
			[id]
		);
		if (!movieAlreadyExists.rows.length > 0) {
			return res.json({
				isSuccess: false,
				msg: "movie not found with id : ",
				id,
			});
		}
		return res.status(200).json({
			isSuccess: true,
			msg: "movie deleted successfully",
		});
	} catch (error) {
		return res.status(400).json({
			isSuccess: false,
			...error,
		});
	}
};

module.exports = {
	getMovies,
	createMovie,
	updateMovie,
	deleteMovie,
};
