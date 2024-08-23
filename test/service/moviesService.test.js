const moviesService = require('../../src/service/moviesService');
const db = require('../setup.js');

jest.mock('../../src/db/db', () => ({
    all: jest.fn((sql) => {
        if (sql.includes('movies')) {
            return Promise.resolve([
                { movieId: 1, imdbId: 'tt1234567', title: 'Test Movie 1', overview: 'Overview 1', productionCompanies: 'Company A', releaseDate: '2020-01-01', budget: 1000000, revenue: 5000000, runtime: 120.5, language: 'English', genres: 'Action,Adventure', status: 'Released' },
                { movieId: 2, imdbId: 'tt2345678', title: 'Test Movie 2', overview: 'Overview 2', productionCompanies: 'Company B', releaseDate: '2021-05-15', budget: 2000000, revenue: 8000000, runtime: 110.0, language: 'English', genres: 'Drama', status: 'Released' }
            ]);
        }
    }),
    get: jest.fn((sql, params) => {
        if (sql.includes('WHERE imdbId')) {
            return Promise.resolve({
                movieId: 1,
                imdbId: params[0],
                title: 'Test Movie 1',
                overview: 'Overview 1',
                productionCompanies: 'Company A',
                releaseDate: '2020-01-01',
                budget: 1000000,
                revenue: 5000000,
                runtime: 120.5,
                language: 'English',
                genres: 'Action,Adventure',
                status: 'Released'
            });
        }
    })
}));

describe('Movies Service', () => {
    test('should fetch all movies', async () => {
        const movies = await moviesService.getMovies({});
        expect(movies.length).toBe(2);
        expect(movies[0].title).toBe('Test Movie 1');
    });

    test('should fetch movie details by IMDb ID', async () => {
        const movie = await moviesService.getMovieDetails('tt1234567');
        expect(movie.imdbId).toBe('tt1234567');
        expect(movie.title).toBe('Test Movie 1');
        expect(movie.overview).toBe('Overview 1');
    });
});
