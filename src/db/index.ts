export {};

const mongoose = require('mongoose');
const { mongoURI } = require('../../config/keys');
const { Player } = require('./models');

mongoose.connect(
  mongoURI,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).catch((error: any) => {
    throw new Error(error)
  }
);

module.exports = {
  
}