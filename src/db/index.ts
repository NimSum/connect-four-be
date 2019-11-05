export {};

const mongoose = require('mongoose');
const { mongoURI } = require('../../config/keys');
const { Player } = require('./models');
const { encryptText } = require('../utils/passwordEncryptions');
const { ObjectId } = mongoose.Types;

mongoose.connect(
  mongoURI,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
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

async function getPlayerById(id: string) {
  return await Player.find(ObjectId(id));
};

async function winnerStatUpdate(id: string, opponent: Opponent) {
  return await Player.findOneAndUpdate(
    {_id: id}, 
    {
      $inc : {'games_played': 1, 'wins': 1, 'win_streak': 1},
      $push: {'game_history': opponent}
    }
  )
};

async function loserStatUpdate(id: string, opponent: Opponent) {
  return await Player.findOneAndUpdate(
    {_id: id}, 
    {
      $inc : {'games_played': 1, 'losses': 1},
      $push: {'game_history': opponent},
      'win_streak': 0,
    }
  );
};



module.exports = {
  createNewPlayer,
  getPlayer,
  getPlayerById,
  winnerStatUpdate,
  loserStatUpdate
}

interface Player {
  player_name: string,
  email: string, 
  password: string, 
  secret_one: string, 
  secret_two: string
}

interface Opponent {
  vs_player: string,
  vs_player_id: string,
  is_winner: boolean,
  created_at: string
}