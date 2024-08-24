# Movie API Service

This project is a Node.js-based Movie API service that provides endpoints to retrieve movie data from an SQLite database. The API supports pagination, filtering by year and genre, and returns movie details with formatted fields.

## Features

- **Pagination**: Fetch movies in paginated format with **customizable page size**.
- **Filtering**: Filter movies by release year and genre.
- **Sorting**: Sort movies by release date in descending order.
- **Data Formatting**: Format budget values to USD and genre names and production companies into comma-separated strings.
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

3. **Optional: Set up the databases**:
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


#### 2. Get Movie

- **URL**: `/api/movies/:movie_id`
- **Method**: `GET`
- **Response**: JSON array of movies with the following fields:
  - `movieId`
  - `imdbId`
  - `title`
  - `releaseDate`
  - `budget`
  - `runtime`
  - `genres`
  - `productionCompanies`
  - `overview`
  - `language`

#### Example Request

```bash
GET http://localhost:3000/api/movies/81
```

#### Example Response

```json
{
  "movieId": 81,
  "imdbId": "tt0087544",
  "title": "Nausicaä of the Valley of the Wind",
  "releaseDate": "1984-03-11",
  "runtime": "117 minutes",
  "averageRating": "3.25",
  "budget": "$1,000,000.00",
  "description": "After a global war, the seaside kingdom known as the Valley Of The Wind remains one of the last strongholds on Earth untouched by a poisonous jungle and the powerful insects that guard it. Led by the courageous Princess Nausicaa, the people of the Valley engage in an epic struggle to restore the bond between humanity and Earth.",
  "originalLanguage": "Language not available",
  "productionCompanies": "Topcraft",
  "genres": "Adventure, Animation, Fantasy"
}
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
- **API Documentation**: Integrate Swagger or OpenAPI for interactive API documentation.
- **Parameterized Queries**: All SQL queries could be parameterized to prevent SQL injection attacks.
- **Error Handling**: Comprehensive error handling and logging.
- **Route level integration testing**: There are no controller or route level integration tests.
