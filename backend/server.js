require('dotenv').config();
const mongoose = require('mongoose');
const setRoutes = require('./routes/sets');
const userRoutes = require('./routes/user');
const express = require('express');
const path = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, conf: { distDir: path.join(__dirname, '../client/.next') } });
const handle = nextApp.getRequestHandler();
const app = express();

// Middleware
app.use(express.json());

// Serve static files from the Next.js build
app.use(express.static(path.join(__dirname, '../client/public')));

// Prepare Next.js app
nextApp.prepare().then(() => {
    // API routes
    app.use('/api/sets', setRoutes);
    app.use('/api/user', userRoutes);

    // Catch-all route to handle all other requests
    app.all('*', (req, res) => {
        return handle(req, res); // Next.js will handle the request
    });

    // Connect to database
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to database");

            // Listen for requests
            app.listen(process.env.PORT, () => {
                console.log(`Listening on port http://localhost:${process.env.PORT}`);
            });
        })
        .catch((error) => {
            console.log(error);
        });
});
