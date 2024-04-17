# Install

Use `npm i` to install the dependencies in the project.

# Run

Use the `npm run start` to run the app in development mode.

# Tech Stack Used

- Express
- CORS
- Nodemon
- Pg

# Prerequisites

Add .env file with these variables

```
POSTGRES_USER="POSTGRES_USER"
POSTGRES_HOST="POSTGRES_HOST"
POSTGRES_DB="POSTGRES_DB"
POSTGRES_PASSWORD="POSTGRES_PASSWORD"
DB_TABLE_NAME="DB_TABLE_NAME"

PORT='PORT'
MOVIES_OMDB_API='MOVIES_OMDB_API'
OMDB_API_KEY='OMDB_API_KEY'
```

# Main API Endpoints

```
GET --> /movies
POST --> /movie
UPDATE --> /movie/:id
DELETE --> /movie/:id
```

# Principle

The application has an Express server with CORS and JSON data encoding middleware running on the default port 8090.

The Express app uses a router to facilitate the CRUD routes.

The app also has a controllers file which segregates the route endpoints with route handlers, keeping the data segregated.

The app has a db folder where the postgres database is initialized with few utility methods.

To generate movies data, I have used the API endpoint from `https://www.omdbapi.com/`

To fetch movies and tv series, I created a json to fetch respective data from the json file.

The app has a utils folder to fetch movies/series and a few other utility functions used in the application.
