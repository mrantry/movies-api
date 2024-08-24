const { moviesDb, ratingsDb } = require("../db/db");
const {
  formatToUSD,
  formatGenres,
  formatProductionCompanies,
} = require("../util/moviesUtil");

exports.getMovies = async ({ page = 1, pageSize = 50, year, genre }) => {
  // Calculate offset for pagination
  const offset = (page - 1) * pageSize;

  const columsSql = `SELECT movieId, imdbId, title, genres, releaseDate, budget FROM movies`;
  const yearFilter = year ? `WHERE releaseDate LIKE '${year}%'` : "";
  const genreFilter = genre ? `WHERE genres LIKE '%${genre}%'` : ""; // should probably filter by genre id, not name
  const sorting = `ORDER BY releaseDate DESC`;
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
