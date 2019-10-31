const players = new Map<any,any>();
const chatContainer: Array<ChatHistoryItem> = [];

module.exports = function(client: any, io: any) {
  function broadcastMessage(message: string) {
    if (message.length > 1) {
      const { player_name } = players.get(client.id) || {};
    const setMessage = { message, player_name, timestamp: Date.now() }
    chatContainer.push(setMessage);

    const update: ChatHistoryItem = { type: 'message', ...setMessage };
    broadcastToWorld(update);
  }
  }
  
  

  return {
    broadcastToWorld,
    getChatHistory,
    joinWorldChat,
    leaveWorldChat,
    getWorldChatPlayers,
    broadcastMessage
  }
};
