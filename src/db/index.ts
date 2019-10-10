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

async function createNewPlayer(player: Player) {
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

async function getPlayer(isEmail: boolean, player: string) {
  const type: string = isEmail ? 'email' : 'player_name';
  return await Player.findOne({ [type]: player });
};

module.exports = {
  createNewPlayer,
  getPlayer
}

interface Player {
  player_name: string,
  email: string, 
  password: string, 
  secret_one: string, 
  secret_two: string
}