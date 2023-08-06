const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/my_database';
console.log(MONGO_URL);

const databaseConnection = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database Connected Successfully");
  } catch (e) {
    console.log("Database Failed", e);
  }
};

module.exports = databaseConnection;