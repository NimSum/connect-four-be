export {};
const GameRoom = require('./GameRoom');
  async function registerClient(token: string) {
    try {
      const validToken = await verifyToken(`Bearer ${token}`);
      if (validToken && !!validToken._id) {
        const { _id } = validToken;
        const player = await db.getPlayerById(_id);
        if (player) {
          clients.set(client.id, serializePlayer(player[0]));
          console.log('Online: ' ,clients.size);
        }
        sendAllGameRooms();
      } else {
        clients.set(client.id, serializePlayer(validToken));
        console.log('Online: ' ,clients.size);
      }
    } catch(err) {
      io.sockets.connected[client.id]
      .emit('socket has errored', {type: 'registration', error: 'Failed to register client'});
    }
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