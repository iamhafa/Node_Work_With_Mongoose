const mongoose = require('mongoose');
require('dotenv').config();

// connect to the database
function connectDB() {
  mongoose
    .set('debug', true) // enable mongoose debug mode
    .connect(
      // use dotenv to get the connection string
      `${process.env.DB}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`,
      () => {
        console.log('>>> Connected successfully to the database');
      },
      (err) => {
        console.error('>>> Connect to database fail', err.message);
      }
    );
}

module.exports = connectDB;
