export {};
const GameRoom = require('./GameRoom');
  function sendAllGameRooms() {
    io.sockets.connected[client.id]
      .emit('send all game rooms', 
        Array.from(gameRooms.values())
        .map(room => serializeRoom(room)));
  };
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