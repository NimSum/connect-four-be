export {};

const createHandlers = require('./handlers');
const ClientManager = require('./ClientManager');
const GameRoomManager = require('./GameRoomManager');

const clientManager = ClientManager();
const gameRoomManager = GameRoomManager();

function eventsManager(client: any) {
  const {
    handleRegister,
    handleJoin,
    handleLeave,
    handleGridUpdate,
    getGameRooms,
    getAvailablePlayers,
    handleDisconnect
  } = createHandlers(client, clientManager, gameRoomManager)
  
  client.emit('timer', client.id);

  client.on('register', handleRegister);

  client.on('join', handleJoin);

  client.on('gridUpdate', handleGridUpdate);

  client.on('leave', handleLeave);

  client.on('gameRooms', getGameRooms);
  
  client.on('availablePlayers', getAvailablePlayers);
  
  console.log(`Client connected... ${client.id}`);

  client.on('disconnect', () => {
    // perform disconnect tasks here
    console.log(`Client disconnect... ${client.id}`)
  });

  client.on('error', () => {
    // perform error tasks here
    console.log(`Client error... ${client.id}`)
  });
};

module.exports = eventsManager;