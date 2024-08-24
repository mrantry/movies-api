const sqlite3 = require("sqlite3").verbose();
const path = require("path");

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
