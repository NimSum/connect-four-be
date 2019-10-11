const { Player } = require('../../dist/src/db/models');
const { expect } = require('chai');
const { newPlayer } = require('../mockData');
const mongoose = require('mongoose');

describe('mongodb', () => {
  const player = new Player(newPlayer);
  player._id = new mongoose.Types.ObjectId();

  it('responds with new player', async () => {
    const result = await player.save()

    expect(result.player_name).to.equal(player.player_name); 
  });
  
  it('creates player in players db', async () => {
    const result = await Player.findOne({ 'email': newPlayer.email });

    expect(result.player_name).to.equal(player.player_name);
  });

});