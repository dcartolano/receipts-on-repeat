import express from 'express';
import bodyParser from 'body-parser';
import spotifyAuth from './routes/spotify/spotifyAuth.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8888;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (if needed)
app.use(express.static('public'));

// Homepage route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Spotify Auth</title>
      </head>
      <body>
        <h1>Welcome to the Spotify Auth App</h1>
        <button onclick="window.location.href='/spotify/login'">Login with Spotify</button>
      </body>
    </html>
  `);
});

// Use the Spotify authentication routes
app.use('/spotify', spotifyAuth);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});