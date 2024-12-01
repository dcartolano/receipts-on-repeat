import express from 'express';
import bodyParser from 'body-parser';
import spotifyAuth from './routes/spotifyAuth.js'; // Adjusted import path
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static('client/build')); // Adjust the path to your build folder

// Use the Spotify authentication routes
app.use('/spotify', spotifyAuth);

// Catch-all route to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html')); // Adjust the path as necessary
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});