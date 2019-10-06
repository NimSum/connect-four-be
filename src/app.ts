const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');
const socket = require('socket.io');
const express = require('express');

const app = express();
const server = app.listen(3000, (err: any) => {
  if (err) throw err;

  console.log('Listening to requests on port 3000')
});
const io = socket(server);

io.on('connection', (client: any) => {
  client.on('register', handleRegister);

  client.on('join', handleJoin);

  client.on('leave', handleLeave);

  client.on('gameRooms', handleGetGameRooms);
  
  client.on('availablePlayers', handleGetAvailablePlayers)

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

function handleRegister() {

};

function unregisterHandler() {

};

function register(name, cb) {

};

function handleJoin(gameRoomName, cb) {

};

function handleLeave(gameRoomName, cb) {

};

function handleGridUpdate(gameRoomName, grid, cb) {

};

function getGameRooms(cb) {

};

function getAvailablePlayers(cb) {

};