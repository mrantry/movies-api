# Movie API Service

This project is a Node.js-based Movie API service that provides endpoints to retrieve movie data from an SQLite database. The API supports pagination, filtering by year and genre, and returns movie details with formatted fields.

## Features

- **Pagination**: Fetch movies in paginated format with customizable page size.
- **Filtering**: Filter movies by release year and genre.
- **Sorting**: Sort movies by release date in descending order.
- **Data Formatting**: Format budget values to USD and genre names into comma-separated strings.
- **Secure Queries**: Uses parameterized queries to prevent SQL injection attacks.
- **Modular Design**: The code is organized into services, database integrations, and utility functions for easy maintenance.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mrantry/movie-api-service.git
   cd movie-api-service
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up the databases**:
   Place your SQLite databases (`movies.db` and `ratings.db`) inside the `databases` directory.

## Usage

### Running the Server

To start the server, run:

```bash
npm start
```

By default, the server runs on `http://localhost:3000`.

### API Endpoints

#### 1. List Movies

- **URL**: `/api/movies`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (optional): Page number for pagination (default is 1)
  - `pageSize` (optional): Number of movies per page (default is 50)
  - `year` (optional): Filter movies by release year
  - `genre` (optional): Filter movies by genre
- **Response**: JSON array of movies with the following fields:
  - `movieId`
  - `imdbId`
  - `title`
  - `genres`
  - `releaseDate`
  - `budget`

#### Example Request

```bash
GET http://localhost:3000/api/movies?page=1&pageSize=10&year=1984&genre=12
```

#### Example Response

```json
[
  {
    "movieId": 81,
    "imdbId": "tt0087544",
    "title": "Nausicaä of the Valley of the Wind",
    "genres": "Adventure, Animation, Fantasy",
    "releaseDate": "1984-03-11",
    "budget": "$1,000,000.00"
  }
]
```

## Testing

This project uses Jest for testing.

To run the tests:

```bash
npm test
```

Test cases cover:

- Service functions for fetching and filtering movies.
- Data formatting logic.
- Handling of edge cases.

## Potential Improvements

- **Extended Filtering**: Implement more advanced filtering (e.g., multiple genres, budget ranges).
- **Caching**: Add caching for frequently accessed data to improve performance.
- **Enhanced Validation**: Add input validation for query parameters.
- **API Documentation**: Integrate Swagger for interactive API documentation.
- **Parameterized Queries**: All SQL queries could be parameterized to prevent SQL injection attacks.
- **Error Handling**: Comprehensive error handling and logging.
