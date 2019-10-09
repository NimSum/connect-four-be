export {};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema();

module.exports = {
  Player: mongoose.model('Player', playerSchema)
};