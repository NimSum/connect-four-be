module.exports = function (client, clientManager, gameRoomManager) {
    client.on('error', (err) => {
        console.log(`Recieved socket error: /n ${err}`);
    });
    function handleRegister({ playerId }) {
        const player = clientManager.getPlayerById(playerId);
        clientManager.registerClient(client, player);
    }
    ;
    // function unregisterHandler() {
    //   io.off('gridUpdate');
    // };
    function handleJoin({ gameRoomId, playerId }) {
        const createMessage = () => ({ event: `joined ${gameRoomId}` });
        const gameRoom = gameRoomManager.getGameRoomById(gameRoomId);
        const player = clientManager.getPlayerById(playerId);
        gameRoom.addPlayer(client, player);
    }
    ;
    function handleLeave(gameRoomId) {
        const createMessage = () => ({ event: `joined ${gameRoomId}` });
        const gameRoom = gameRoomManager.getGameRoomById(gameRoomId);
        gameRoom.removePlayer(client);
    }
    ;
    function handleGridUpdate(gameRoomId, grid) {
        const gameRoom = gameRoomManager.getGameRoomById(gameRoomId);
        gameRoom.broadcastGrid(grid);
    }
    ;
    function getGameRooms() {
        gameRoomManager.serializeGameRooms();
    }
    ;
    function getAvailablePlayers() {
        clientManager.getAvailablePlayers();
    }
    ;
    function handleDisconnect() {
        clientManager.removeClient(client);
        gameRoomManager.removeClient(client);
    }
    return {
        handleRegister,
        handleJoin,
        handleLeave,
        handleGridUpdate,
        getGameRooms,
        getAvailablePlayers,
        handleDisconnect
    };
};
//# sourceMappingURL=handlers.js.map