const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');

mongoose.connect(
  mongoURI,
  {
    useMongoClient: true
  }
)