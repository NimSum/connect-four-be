export {};

const mongoose = require('mongoose');
const { mongoURI } = require('../../config/keys');
const { Player } = require('./models');
const { encryptText } = require('../utils/passEncryptions');

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

  try {
    console.log(newPlayer);
    // return await newPlayer.save();
  } catch(error) {
    throw new Error(error);
  }
};

async function getPlayer(player) {
  const { email, password } = player;

  try {
    return await Player.findOne({ 'email': email });
  } catch(error) {
    throw new Error(error);
  }
};

module.exports = {
  createNewPlayer,
  getPlayer
}