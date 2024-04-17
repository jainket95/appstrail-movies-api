const { v4 } = require("uuid");
const { insertMovie } = require("../db");

const { MOVIES_OMDB_API, OMDB_API_KEY } = process.env;

const generateMovieUrl = (item) => {
	return `${MOVIES_OMDB_API}/?apikey=${OMDB_API_KEY}&t=${item.title
		.split(" ")
		.join("+")}&y=${item.year}&plot=short&r=json`;
};

const fetchMoviesData = async (movies) => {
	const promises = movies.map(async (item) => {
		const movieUrl = generateMovieUrl(item);
		const response = await fetch(movieUrl);
		const data = await response.json();
		return data;
	});

	const data = await Promise.all(promises);
	return data.filter((item) => item.Response !== "False");
};

async function fetchAndInsertMovies(movies) {
	//inserting the movies in postgres table one by one
	const moviesDetails = await fetchMoviesData(movies);
	for (let movieData of moviesDetails) {
		if (movieData) await insertMovie(v4(), movieData);
	}
}

module.exports = {
	fetchAndInsertMovies,
};
