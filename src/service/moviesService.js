const { moviesDb, ratingsDb } = require("../db/db");
const { formatToUSD } = require("../util/moviesUtil");

exports.getMovies = async ({ page = 1, pageSize = 50, year, genre }) => {
  // Calculate offset for pagination
  const offset = (page - 1) * pageSize;

  const columsSql = `SELECT movieId, imdbId, title, genres, releaseDate, budget FROM movies`;
  const yearFilter = year ? `WHERE releaseDate LIKE '${year}%'` : "";
  const genreFilter = genre ? `WHERE genres LIKE '%${genre}%'` : ""; // should probably filter by genre id, not name
  const sorting = `ORDER BY releaseDate DESC`;
  const pagination = `LIMIT ? OFFSET ?`;

  const sql = [columsSql, yearFilter, genreFilter, sorting, pagination].join(
    " "
  );

  const movies = await moviesDb.all(sql, [pageSize, offset]);
  const formattedMovies = movies.map((movie) => ({
    ...movie,
    budget: formatToUSD(movie.budget),
  }));
  return formattedMovies;
};

exports.getMovieDetails = async (movie_id) => {
  const movieSql = `
    SELECT movieId, imdbId, title, releaseDate, budget, runtime, genres, productionCompanies
    FROM movies 
    WHERE movieId = ?
  `;
  const ratingsSql = `SELECT rating FROM ratings WHERE movieId = ?`;

  const [movie, ratings] = await Promise.all([
    moviesDb.get(movieSql, [movie_id]),
    ratingsDb.all(ratingsSql, [movie_id]),
  ]);

  const averageRating =
    ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;

  const formatProductionCompanies = (productionCompanies) => {
    const productionCompaniesArray = JSON.parse(productionCompanies);
    const productionCompaniesString = productionCompaniesArray
      .map((company) => company.name)
      .join(", ");
    return productionCompaniesString;
  };

  const formatGenres = (genres) => {
    const genresArray = JSON.parse(genres);
    const genresString = genresArray.map((genre) => genre.name).join(", ");
    return genresString;
  };

  const formattedMovies = {
    ...movie,
    averageRating,
    budget: formatToUSD(movie.budget),
    description: movie.overview,
    originalLanguage: movie.language,
    productionCompanies: formatProductionCompanies(movie.productionCompanies),
    genres: formatGenres(movie.genres),
  };

  return formattedMovies;
};
