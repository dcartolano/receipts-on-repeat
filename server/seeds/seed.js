import db from "../config/connection.js";
import Receipt from "../models/Receipt.js";
import cleanDB from "./cleanDB.js";

import spotifyData from './spotifyData.json' assert { type: "json" };

try {
  await db();
  await cleanDB();

  //bulk create each model
  await Receipt.insertMany(spotifyData);

  console.log('Seeding completed successfully');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database: ', error);
  process.exit(1);
}
