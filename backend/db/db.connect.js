const mongoose = require('mongoose')
require('dotenv').config()

const mongoUrl = process.env.MONGODB 

const initializeDatabase = async () => {
  await mongoose
  .connect(mongoUrl)
  .then(() => console.log("Successfully connected to database"))
  .catch((error) => console.log("An error occured while connecting to database."))
}

module.exports = { initializeDatabase }