import express from 'express';
import bodyParser from 'body-parser';
import spotifyAuth from './routes/spotify/spotifyAuth.js';
import dotenv from 'dotenv';
import path from 'path';
import routes from './routes/index.js'
// import path from 'node:path'
// const __dirname = import.meta.dirname;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the Spotify authentication routes
//app.use('/spotify', spotifyAuth);

// Serve static files from the React app
app.use(express.static(path.join(process.cwd(), 'client/build'))); // Use process.cwd() for better compatibility

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/dist')));
// }

app.use(routes);
// Catch-all route to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client/build', 'index.html')); // Use process.cwd() for better compatibility
});

// app.get('*', (_req, res) => {
//     res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//   });


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});