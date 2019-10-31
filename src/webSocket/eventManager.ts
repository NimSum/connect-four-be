export {};

const GameRoomManager = require('./GameRoomManager');
const WorldChatManager = require('./WorldChatManager');

function eventsManager(client: any, io: any) {
  const worldChatManager = WorldChatManager(client, io);
  const gameRoomManager = GameRoomManager(client, io);

  const { 
    joinWorldChat, 
    leaveWorldChat,
    getWorldChatPlayers,
    broadcastMessage
  } = worldChatManager;

  const {
    registerClient,
    removeClient,
    createGameRoom,
    joinGameRoom,
    leaveRoom,
    handleSetPlayerReady,
    handleChipPlacement,
    handleInGameChat
  } = gameRoomManager;

  /// WORLD CHAT
  client.on('join world chat', joinWorldChat);
  
  client.on('leave world chat', leaveWorldChat);

  client.on('broadcast to world chat', broadcastMessage) 

  client.on('get world chat players', getWorldChatPlayers);

  /// CLIENT REGISTRATION
  client.on('register client', registerClient);

  client.on('remove client', removeClient);

  /// GAME ROOM UPDATES
  client.on('update the game', () => io.emit('game update'));

  client.on('create game room', createGameRoom);

  client.on('join game room', joinGameRoom);

  client.on('leave game room', leaveRoom);

  /// ACTIVE GAME ROOM
  client.on('set player ready', handleSetPlayerReady);
  
  client.on('place player chip', handleChipPlacement);

  client.on('send in game message', handleInGameChat)

  console.log(`Client connected... ${client.id}`);

  client.on('disconnect', () => {
    removeClient();
    leaveWorldChat();
  });

  client.on('error', () => {
    removeClient();
    leaveWorldChat();
  });
};

module.exports = eventsManager;