export {};
const GameRoom = require('./GameRoom');
  function broadcastGameUpdate(clientId: string, payload: object) {
    io.sockets.connected[clientId].emit('active game update', payload)
  };
  };
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