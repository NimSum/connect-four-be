export {};
const GameRoom = require('./GameRoom');
  function joinGameRoom(details) {
    const { roomId, password } = details;
    const room = getGameRoomById(roomId);

    if (room && room.roomDetails.password === password) {
      const player = getPlayerByClientId();
      player.inRoom = roomId;
      room.addPlayer(client.id, player);

      const updateMessage = {...serializeRoom(room), updateType: 'updateRoom'};
      broadcastGameRoomUpdates(updateMessage);
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