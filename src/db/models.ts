export {};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  player_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  secret_one: { type: String, required: true },
  secret_two: { type: String, required: true },
  win_streak: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  games_played: { type: Number, default: 0 },
  friends: [Number],
  achievements: [Number],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = {
  Player: mongoose.model('Player', playerSchema)
};