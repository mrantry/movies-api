const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

// Get new movies
router.get("/", (req, res) => moviesController.getMovies(req, res));
router.get("/:movie_id", (req, res) =>
  moviesController.getMovieDetails(req, res)
);

module.exports = router;
