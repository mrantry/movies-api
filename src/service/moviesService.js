const db = require("../db/db");

exports.getMovies = async ({ page = 1, pageSize = 50 }) => {
  // Calculate offset for pagination
  const offset = (page - 1) * pageSize;

  const sql = `
     SELECT imdbId, title, genres, releaseDate, budget 
     FROM movies 
     LIMIT ? OFFSET ?;
 `;

  // Execute the query with the limit and offset parameters
  const movies = await db.all(sql, [pageSize, offset]);
  return movies;
};

exports.getMovieDetails = async (imdb_id) => {
  let sql = `SELECT * FROM movies WHERE imdbId = ?`;

  const movie = await db.get(sql, [imdb_id]);
  return movie;
};
