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

async function createNewPlayer(player) {
  const { player_name, email, password, secret_one, secret_two } = player;
  
  const newPlayer = new Player({
    _id: new mongoose.Types.ObjectId(),
    player_name,
    email,
    password,
    secret_one,
    secret_two
  });

  try {
    return await newPlayer.save();
  } catch(error) {
    throw new Error(error);
  }
};

module.exports = {
  createNewPlayer
}