const db = require('../db/db');

exports.getMovies = async (query, options = {}) => {
    let sql = `SELECT * FROM movies LIMIT 100`;

    // Add filters, pagination, etc.
    const movies = await db.all(sql);
    return movies;
};

exports.getMovieDetails = async (imdb_id) => {

    let sql = `SELECT * FROM movies WHERE imdbId = ?`;

    const movie = await db.get(sql, [imdb_id]);
    return movie;
};
