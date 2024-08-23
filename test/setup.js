const sqlite3 = require('sqlite3').verbose();

// Use an in-memory database for tests
const db = new sqlite3.Database(':memory:');

beforeAll(() => {
    // Create the movies table with the provided schema
    const createMoviesTable = `
        CREATE TABLE movies (
            movieId INTEGER PRIMARY KEY, 
            imdbId TEXT NOT NULL, 
            title TEXT NOT NULL, 
            overview TEXT, 
            productionCompanies TEXT, 
            releaseDate TEXT, 
            budget INTEGER, 
            revenue INTEGER, 
            runtime REAL, 
            language TEXT, 
            genres TEXT, 
            status TEXT
        );
    `;
    
    db.run(createMoviesTable);
    
    // Insert some test data into the movies table
    const insertMovies = `
        INSERT INTO movies (imdbId, title, overview, productionCompanies, releaseDate, budget, revenue, runtime, language, genres, status) VALUES
        ('tt1234567', 'Test Movie 1', 'Overview 1', 'Company A', '2020-01-01', 1000000, 5000000, 120.5, 'English', 'Action,Adventure', 'Released'),
        ('tt2345678', 'Test Movie 2', 'Overview 2', 'Company B', '2021-05-15', 2000000, 8000000, 110.0, 'English', 'Drama', 'Released');
    `;
    
    db.run(insertMovies);
});

afterAll(() => {
    db.close();
});

module.exports = db;
