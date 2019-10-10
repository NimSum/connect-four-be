export {};

const mongoose = require('mongoose');
const { mongoURI } = require('../../config/keys');
const { Player } = require('./models');
const { encryptText } = require('../utils/passwordEncryptions');

mongoose.connect(
  mongoURI,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
).catch((error: any) => {
    throw new Error(error)
  }
);

async function createNewPlayer(player) {
  const { player_name, email, password, secret_one, secret_two } = player;
  
  const newPlayer = new Player({
    _id: new mongoose.Types.ObjectId(),
    player_name,
    email,
    password: await encryptText(password),
    secret_one,
    secret_two
  });

  return await newPlayer.save();
};

async function getPlayer(player) {
  const { email, password } = player;

  return await Player.findOne({ 'email': email });
};

module.exports = {
  createNewPlayer,
  getPlayer
}