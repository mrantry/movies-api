const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// NOTE: In a real-world application, I would use a connection pool to manage connections to the database
// and avoid the overhead of creating a new connection for each request.
// However, for the purpose of this example, I'm creating a new connection for each request.

// I would, in general, prefer not to upload the database files to the repo, but for the purpose of this example, I'm including them.
// In a real world application, I would consider using a .env file to store the database paths and not include them in the repo.

// Initialize connections to both databases
const moviesDb = new sqlite3.Database(
  path.resolve(__dirname, "../../databases/movies.db")
);
const ratingsDb = new sqlite3.Database(
  path.resolve(__dirname, "../../databases/ratings.db")
);

// Helper function to create query executors for a specific database
const createQueryExecutor = (db) => ({
  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },
});

module.exports = {
  moviesDb: createQueryExecutor(moviesDb),
  ratingsDb: createQueryExecutor(ratingsDb),
};
