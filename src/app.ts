const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');
const socket = require('socket.io');
const express = require('express');

const app = express();
const server = app.listen(3000, () => {
  console.log('Listening to requests on port 3000')
});
const io = socket(server);

io.on('connection', (socket: object) => {
  console.log(socket)
});

mongoose.connect(
  mongoURI,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).catch((error: any) => console.log(error));

app.use(express.static('public'));