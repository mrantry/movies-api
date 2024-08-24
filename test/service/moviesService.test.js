const moviesService = require("../../src/service/moviesService");

describe("Movies Service", () => {
  describe("list all movies", () => {
    test("should fetch all movies with a limit of 50", async () => {
      const movies = await moviesService.getMovies({});
      expect(movies.length).toBe(50);
    });

    test("should return the movies with the expected properties", async () => {
      const movies = await moviesService.getMovies({});
      const expectedProperties = [
        "imdbId",
        "title",
        "genres",
        "releaseDate",
        "budget",
        "movieId",
      ];
      const receivedProperties = Object.keys(movies[0]);

      expect(movies).not.toBe(null);
      expect(receivedProperties.length).toEqual(expectedProperties.length);
      expectedProperties.forEach((property) => {
        expect(receivedProperties).toContain(property);
      });
    });

    test("gets 2 pages of movies", async () => {
      const page1 = await moviesService.getMovies({ page: 1 });
      const page2 = await moviesService.getMovies({ page: 2 });
      expect(page1.length).toBe(50);
      expect(page2.length).toBe(50);
      expect(page1).not.toEqual(page2);
    });

    test("should format the budget to USD", async () => {
      const movies = await moviesService.getMovies({});
      const dollarRegex = /^\$\d+(,\d{3})*(\.\d{2})?$/;
      movies.forEach((movie) => {
        const isValid =
          dollarRegex.test(movie.budget) ||
          movie.budget === "Budget not available";
        expect(isValid).toBe(true);
      });
    });

    describe("should be able to filter movies", () => {
      test("by year", async () => {
        const movies = await moviesService.getMovies({ year: 2020 });
        expect(movies.length).toBeGreaterThan(0);
        movies.forEach((movie) => {
          expect(movie.releaseDate).toMatch(/^2020-/);
        });
      });

      test("by genre name", async () => {
        const movies = await moviesService.getMovies({ genre: "Drama" }); // should probably filter by genre id, not name
        expect(movies.length).toBeGreaterThan(0);
        movies.forEach((movie) => {
          expect(movie.genres).toContain("Drama");
        });
      });
    });
  });

  describe("get movie details", () => {
    test("should fetch movie details by IMDb ID", async () => {
      const movies = await moviesService.getMovies({});
      const { movieId } = movies[0];
      const movie = await moviesService.getMovieDetails(movieId);
      expect(movie).toHaveProperty("movieId", movieId);
    });

    test("should return the movie with the correct properties", async () => {
      // imdb id, title, description, release date, budget, runtime, average rating, genres, original language, production companies
      const expectedProperties = [
        "movieId",
        "imdbId",
        "title",
        "description",
        "releaseDate",
        "budget",
        "runtime",
        "averageRating",
        "genres",
        "originalLanguage",
        "productionCompanies",
      ];

      const movies = await moviesService.getMovies({});
      const movie = await moviesService.getMovieDetails(movies[0].movieId);

      const receivedProperties = Object.keys(movie);
      expect(receivedProperties.length).toEqual(expectedProperties.length);
      expectedProperties.forEach((property) => {
        expect(receivedProperties).toContain(property);
      });
    });

    test("should format the budget to USD", async () => {
      const movieId = 81; // exists in both movies and ratings db
      const movie = await moviesService.getMovieDetails(movieId);
      const dollarRegex = /^\$\d+(,\d{3})*(\.\d{2})?$/;
      expect(movie.budget).toMatch(dollarRegex);
    });

    test("should calculate the average rating", async () => {
      const movieId = 81; // exists in both movies and ratings db
      const movie = await moviesService.getMovieDetails(movieId);
      expect(parseFloat(movie.averageRating)).toBeGreaterThanOrEqual(0);
    });
  });
});
