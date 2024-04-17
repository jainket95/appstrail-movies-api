const { Pool } = require("pg");

const {
	POSTGRES_HOST,
	POSTGRES_DB,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	DB_TABLE_NAME,
} = process.env;

const client = new Pool({
	host: POSTGRES_HOST,
	database: POSTGRES_DB,
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
	port: 5432,
});

let isTableCreated = false;

async function createTable() {
	try {
		await client.connect();
		const query = `
         CREATE TABLE IF NOT EXISTS ${DB_TABLE_NAME} (
            id VARCHAR(36) PRIMARY KEY,
            "movie" jsonb
         );
      `;
		await client.query(query);
		isTableCreated = true;
		console.log("Table created successfully");
	} catch (err) {
		console.error("Error creating table:", err);
	}
}

if (!isTableCreated) {
	createTable();
	isTableCreated = true;
}

async function insertMovie(id, movieDetails) {
	try {
		const sql = `INSERT INTO ${DB_TABLE_NAME} (id, movie) VALUES ($1, $2)`;
		const values = [id, movieDetails];
		await client.query(sql, values); // Directly using pool to query simplifies connection handling
		console.log("Movie inserted successfully:", movieDetails);
		// return { isSuccess: true };
	} catch (error) {
		console.error("Error inserting movie:", error);
		// return { error: error.message, isSuccess: false };
	}
}

module.exports = { client, createTable, insertMovie };
