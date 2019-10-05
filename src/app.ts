const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');

mongoose.connect(
  mongoURI,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)