export {};
const GameRoom = require('./GameRoom');
  function createGameRoom({ name, password }) {
    const newId = uuidv4();
    const player = getPlayerByClientId();

    if (player) {
      const newRoom = new GameRoom(newId, name, password || '', broadcastGameUpdate, removeGameRoom);
    
      player.inRoom = newId;
      newRoom.addPlayer(client.id, player);
      gameRooms.set(newId, newRoom);
      
      const updateMessage = {...serializeRoom(newRoom), updateType: 'addRoom'};
      broadcastGameRoomUpdates(updateMessage);
    }
  };
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