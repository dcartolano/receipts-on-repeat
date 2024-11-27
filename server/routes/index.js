import express from 'express';
const router = express.Router();

import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import apiRoutes from './api/index.js';
import spotifyAuth from './spotify/spotifyAuth.js'; // Import the spotifyAuth route

// Use the spotifyAuth route under /api/spotify
router.use('/api/spotify', spotifyAuth);

// Use the other API routes
router.use('/api', apiRoutes);

// serve up react front-end in production
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

export default router;