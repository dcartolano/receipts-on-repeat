import express from 'express';
import bodyParser from 'body-parser';
import spotifyAuth from './routes/spotify/spotifyAuth.js';
import db from './config/connection.js';
import dotenv from 'dotenv';
import path from 'path';
import routes from './routes/index.js'

const __dirname = import.meta.dirname;

await db();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
} else {
    app.use(express.static('../client/dist'));
}

app.use(routes);
// Catch-all route to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});