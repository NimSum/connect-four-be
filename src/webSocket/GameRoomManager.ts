export {};
const GameRoom = require('./GameRoom');
  function leaveRoom() {
    const player = getPlayerByClientId();
    const room = getGameRoomById(player.inRoom);

    if (room && player) {
      player.inRoom = '';
      room.removePlayer(client.id);
      if (!!room.players[0] || !!room.players[1]) {
        const updateMessage = {...serializeRoom(room), updateType: 'updateRoom'};
        broadcastGameRoomUpdates(updateMessage);
      }
      const updateMessage = {...serializeRoom(room), updateType: 'updateRoom'};
  };
    }
  };
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