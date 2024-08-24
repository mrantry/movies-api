const moviesService = require("../service/moviesService");

exports.getMovies = async (req, res) => {
  try {
    const movies = await moviesService.getMovies(req.query);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getMovieDetails = async (req, res) => {
  try {
    const movie = await moviesService.getMovieDetails(req.params.movie_id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
