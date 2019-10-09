const GameRoom = require('./GameRoom');

module.exports = function() {
  const mockGameRooms = [
    {
      name: 'Game Room 1',
      id: '1'
    },
    {
      name: 'Game Room 2',
      id: '2'
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