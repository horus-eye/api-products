// Import necessary modules
const express = require("express");
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 3000;

// Import routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/user');

// Middleware configuration
app.use(express.json());
app.use(cors());
app.use('/api', productRoutes);
app.use('/api/', userRoutes);

// Default routes
app.get('/', (req, res) => {
    res.send("Welcome to my app");
});
app.get('/api', (req, res) => {
    res.send("Welcome to my app");
});
app.get('/*', (req, res) => {
    res.send("error 404");
});

// CORS middleware configuration
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Connect to MongoDB database
const url = process.env.MONGODB_URI;
mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error(error));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
