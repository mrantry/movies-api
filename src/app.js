const express = require('express');
const moviesRoutes = require('./routes/moviesRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/movies', moviesRoutes);

module.exports = app;
