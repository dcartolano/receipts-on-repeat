// import express from 'express';
// const router = express.Router();

// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// import apiRoutes from './playlist-routes.js';

// // Use the other API routes
// router.use('/api', apiRoutes);

// // Serve up react front-end in production
// router.use((_req, res) => {
//   res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
// });

// export default router;

import express from 'express';
const router = express.Router();
import receiptRoutes from './receipt-routes.js';

router.use('/receipts', receiptRoutes);

export default router;
