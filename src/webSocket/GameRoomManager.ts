export {};
const GameRoom = require('./GameRoom');
const uuidv4 = require('uuid/v4');
const db = require('../db');
const { verifyToken } = require('../utils/jwtAuthentication');

const gameRooms = new Map();
const clients = new Map();
    }
  ];

  const gameRooms = new Map(
    mockGameRooms.map(game => [
      game.id,
      GameRoom(game)
    ])
  );

  function removeClient(client) {
    gameRooms.forEach(player => player.removeClient(client));
  };

  function getGameRoomById(id) {
    return gameRooms.get(id)
  };

  function serializeGameRooms() {
    return Array.from(gameRooms.values())
      .map(room => room.serialize());
  };

  function createGameRoom(game) {
    gameRooms.set(game.id, GameRoom(game));
  };

  return {
    removeClient,
    getGameRoomById,
    serializeGameRooms,
    createGameRoom
  };
}