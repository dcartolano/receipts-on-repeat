import express from 'express';
const router = express.Router();
import playlistRoutes from './playlist-routes.js';

router.use('/api', playlistRoutes);

export default router;
