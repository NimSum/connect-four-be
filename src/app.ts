const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');
const client = require('socket.io').listen(3000).sockets;

mongoose.connect(
  mongoURI,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).catch((error: any) => console.log(error));

