require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const next = require('next');
const setRoutes = require('./routes/sets');
const userRoutes = require('./routes/user');

const app = next({ dir: './client' }); // Point to the client directory
const handle = app.getRequestHandler();

const port = process.env.PORT || 5000;

app.prepare().then(() => {
    const server = express();

    server.use(express.json());

    server.use((req, res, next) => {
        console.log(req.path, req.method);
        next();
    });

    // API routes
    server.use('/api/sets', setRoutes);
    server.use('/api/user', userRoutes);

    // Serve Next.js pages
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to database");

            server.listen(port, () => {
                console.log(`Listening on port http://localhost:${port}`);
            });
        })
        .catch((error) => {
            console.log(error);
        });
});
