const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');
const socket = require('socket.io');
const express = require('express');

const app = express();
const server = app.listen(3000, (err: any) => {
  if (err) throw err;
  console.log('Listening to requests on port 3000')
});

app.use(express.static('public'));
const io = socket(server);

mongoose.connect(
  mongoURI,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).catch((error: any) => console.log(error));

io.on('connection', (client: any) => {
  client.on('register', handleRegister);

  client.on('join', handleJoin);

  client.on('gridUpdate', handleGridUpdate);

  client.on('leave', handleLeave);

  client.on('gameRooms', getGameRooms);
  
  client.on('availablePlayers', getAvailablePlayers);

  client.on('disconnect', () => {
    console.log(`Client disconnect... ${client.id}`)
  });

  client.on('error', () => {
    console.log(`Client error... ${client.id}`)
  });
});

io.on('error', (err: string) => {
  console.log(`Recieved socket error: /n ${err}`)
});

function handleRegister(onGridRecieved) {
  io.on('gridUpdate', onGridRecieved);
};

function unregisterHandler() {
  io.off('gridUpdate');
};

function register(name, cb) {
  io.emit('register', name, cb);
};

function handleJoin(gameRoomName, cb) {
  io.emit('join', gameRoomName, cb);
};

function handleLeave(gameRoomName, cb) {
  io.emit('leave', gameRoomName, cb);
};

function handleGridUpdate(gameRoomName, grid, cb) {
  io.emit('gridUpdate', { gameRoomName, grid }, cb );
};

function getGameRooms(cb) {
  io.emit('gameRooms', null, cb);
};

function getAvailablePlayers(cb) {
  io.emit('availablePlayers', null, cb);
};