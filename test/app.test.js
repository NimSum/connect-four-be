const assert = require('assert');
const { Player } = require('../dist/src/db/models');
const mockData = require('./mockData');
const mongoose = require('mongoose');

describe('Player Authentication', () => {

  it('creates a player', (done) => {
    let newPlayer = new Player({ ...mockData.newPlayer });
    newPlayer._id = new mongoose.Types.ObjectId();
    
    newPlayer.save() 
      .then(() => {
          assert(!newPlayer.isNew); 
          done();
      });
  });

});