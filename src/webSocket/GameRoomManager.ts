export {};
const GameRoom = require('./GameRoom');
  function removeClient() {
    leaveRoom();
    clients.delete(client.id);
    console.log('Online: ' ,clients.size);
  };
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