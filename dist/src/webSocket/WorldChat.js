module.exports = function ({ name, id }) {
    const players = new Map();
    let chatContainer = [];
    function broadcastWorldChat(message) {
        chatContainer.push(message);
        players.forEach(player => player
            .emit('worldChatUpdate', message));
    }
    ;
    function getChatHistory(msgAmount) {
        const totalMessages = (chatContainer.length - msgAmount) > 0
            ? chatContainer.length - msgAmount
            : 0;
        return chatContainer.slice(totalMessages, chatContainer.length);
    }
    ;
    function joinWorldChat(client, player) {
        players.set(client.id, { client, player });
        const { player_name } = player;
        const message = {
            player_name,
            message: `${player_name} has joined the chat!`,
            type: 'notification'
        };
        broadcastWorldChat(message);
    }
    ;
    function leaveWorldChat(client) {
        const { player_name } = players.get(client.id) || {};
        players.delete(client.id);
        const message = {
            player_name,
            message: `${player_name} has left the chat.`,
            type: 'notification'
        };
        broadcastWorldChat(message);
    }
    ;
    return {
        broadcastWorldChat,
        getChatHistory,
        joinWorldChat,
        leaveWorldChat,
    };
};
//# sourceMappingURL=WorldChat.js.map