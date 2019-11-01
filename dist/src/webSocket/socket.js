const socket = require('socket.io')(server);
const createHandlers = require('./handlers');
const ClientManager = require('./ClientManager');
const GameRoomManager = require('./GameRoomManager');
const clientManager = ClientManager();
const gameRoomManager = GameRoomManager();
socket.on('connection', (client) => {
    const { handleRegister, handleJoin, handleLeave, handleGridUpdate, getGameRooms, getAvailablePlayers, handleDisconnect } = createHandlers(client, clientManager, gameRoomManager);
    client.on('register', handleRegister);
    client.on('join', handleJoin);
    client.on('gridUpdate', handleGridUpdate);
    client.on('leave', handleLeave);
    client.on('gameRooms', getGameRooms);
    client.on('availablePlayers', getAvailablePlayers);
    client.on('disconnect', () => {
        console.log(`Client disconnect... ${client.id}`);
    });
    client.on('error', () => {
        console.log(`Client error... ${client.id}`);
    });
});
//# sourceMappingURL=socket.js.map