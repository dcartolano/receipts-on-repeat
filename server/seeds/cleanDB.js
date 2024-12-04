import Receipt from '../models/Receipt.js';

const cleanDB = async () => {
  try {
    await Receipt.deleteMany({});
    console.log('Receipt colleciton cleaned');
  }
  catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit();
  }
}

export default cleanDB;