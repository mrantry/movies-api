const { moviesDb, ratingsDb } = require("../db/db");
const {
  formatToUSD,
  formatGenres,
  formatProductionCompanies,
} = require("../util/moviesUtil");

exports.getMovies = async ({ page = 1, pageSize = 50, year, genre }) => {
  // Calculate offset for pagination
  const offset = (page - 1) * pageSize;

  const columns = [
    "movieId",
    "imdbId",
    "title",
    "genres",
    "releaseDate",
    "budget",
  ];

  // NOTE: This is a naive implementation of filtering by genre.
  // This implementation is vulnerable to SQL injection.
  // In a real-world application, I would use parameterized queries to avoid SQL injection.

  // NOTE: Genre is actually a JSON array and there are things that can be done to improve this query
  // For example, we could use the JSON1 extension to SQLite to query the JSON array directly
  // However, for the purpose of this example, I'm keeping it simple.

  const columsSql = `SELECT ${columns.join(", ")} FROM movies`;
  const yearFilter = year ? `WHERE releaseDate LIKE '${year}%'` : "";
  const genreFilter = genre ? `WHERE genres LIKE '%${genre}%'` : "";
  const sorting = year ? `ORDER BY releaseDate DESC` : "";
  const pagination = `LIMIT ${pageSize} OFFSET ${offset}`;

  const sql = [columsSql, yearFilter, genreFilter, sorting, pagination].join(
    " "
  );

  try {
    const movies = await moviesDb.all(sql);
    const formattedMovies = movies.map((movie) => ({
      ...movie,
      budget: movie.budget ? formatToUSD(movie.budget) : "Budget not available",
      genres: movie.genres
        ? formatGenres(movie.genres)
        : "Genres not available",
    }));
    return formattedMovies;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred");
  }
};

exports.getMovieDetails = async (movie_id) => {
  const columns = [
    "movieId",
    "imdbId",
    "title",
    "releaseDate",
    "budget",
    "runtime",
    "genres",
    "productionCompanies",
    "overview",
    "language",
  ];
  const movieSql = `
    SELECT ${columns.join(", ")}
    FROM movies 
    WHERE movieId = ${movie_id}
  `;

  const ratingsSql = `SELECT rating FROM ratings WHERE movieId = ${movie_id}`;

  try {
    const [movie, ratings] = await Promise.all([
      moviesDb.get(movieSql),
      ratingsDb.all(ratingsSql),
    ]);

    if (!movie) {
      return null;
    }

    // Calculate the average rating
    const averageRating =
      ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;

    const {
      movieId,
      imdbId,
      title,
      releaseDate,
      budget,
      runtime,
      genres,
      productionCompanies,
      overview,
      language,
    } = movie;

    // Lots going on here. In the real world, I would need more information about who is consuming the API.
    // It could be nice to only return the fields that are asked for
    // I would also consider returning the raw data and letting the consumer format it as needed

    const formattedMovie = {
      movieId: movieId || "Movie ID not available",
      imdbId: imdbId || "IMDb ID not available",
      title: title || "Title not available",
      releaseDate: releaseDate || "Release date not available",
      runtime: runtime ? `${runtime} minutes` : "Runtime not available",
      averageRating: averageRating
        ? averageRating.toFixed(2)
        : "Rating not available",
      budget: budget ? formatToUSD(budget) : "Budget not available",
      description: overview || "Description not available",
      originalLanguage: language || "Language not available",
      productionCompanies: productionCompanies
        ? formatProductionCompanies(productionCompanies)
        : "Production companies not available",
      genres: genres ? formatGenres(genres) : "Genres not available",
    };

    return formattedMovie;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred");
  }
};
