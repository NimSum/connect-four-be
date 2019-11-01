const players = new Map();
const chatContainer = [];
module.exports = function (client, io) {
    function broadcastMessage(message) {
        if (message.length > 0) {
            const { player_name } = players.get(client.id) || {};
            const setMessage = { message, player_name, timestamp: Date.now() };
            chatContainer.push(setMessage);
            const update = Object.assign({ type: 'message' }, setMessage);
            broadcastToWorld(update);
        }
    }
    function broadcastToWorld(update) {
        io.to('world chat').emit('world chat update', update);
    }
    ;
    function joinWorldChat(player) {
        const { player_name = false } = player;
        if (player_name && !checkIfAlreadyMem(player_name)) {
            players.set(client.id, player);
            client.join('world chat');
            const update = { type: 'player', player };
            broadcastToWorld(update);
            const { player_name } = player;
            const message = {
                player_name,
                message: `${player_name} has joined the chat!`,
                type: 'notification'
            };
            broadcastToWorld(message);
        }
    }
    ;
    function leaveWorldChat() {
        const player = players.get(client.id) || {};
        const { player_name } = player;
        const update = { type: 'player', update_type: 'delete', player };
        const message = {
            player_name,
            message: `${player_name} has left the chat.`,
            type: 'notification'
        };
        if (!!player_name) {
            players.delete(client.id);
            broadcastToWorld(update);
            broadcastToWorld(message);
            client.leave('world chat');
        }
    }
    ;
    function getWorldChatPlayers() {
        io.sockets.connected[client.id].emit('send world chat players', Array.from(players.values()));
    }
    ;
    function checkIfAlreadyMem(player_name) {
        return Array.from(players.values())
            .some(player => player.player_name === player_name);
    }
    ;
    function getChatHistory(msgAmount) {
        const totalMessages = (chatContainer.length - msgAmount) > 0
            ? chatContainer.length - msgAmount
            : 0;
        return chatContainer.slice(totalMessages, chatContainer.length);
    }
    ;
    return {
        broadcastToWorld,
        getChatHistory,
        joinWorldChat,
        leaveWorldChat,
        getWorldChatPlayers,
        broadcastMessage
    };
};
//# sourceMappingURL=WorldChatManager.js.map