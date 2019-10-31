const players = new Map<any,any>();
const chatContainer: Array<ChatHistoryItem> = [];

module.exports = function(client: any, io: any) {
  function broadcastMessage(message: string) {
    if (message.length > 0) {
      const { player_name } = players.get(client.id) || {};
    const setMessage = { message, player_name, timestamp: Date.now() }
    chatContainer.push(setMessage);

    const update: ChatHistoryItem = { type: 'message', ...setMessage };
    broadcastToWorld(update);
  }
  }
  
  function broadcastToWorld(update: ChatHistoryItem | PlayerUpdate) {
    io.to('world chat').emit('world chat update', update);
  };
  
  function joinWorldChat(player: Player) {
    const { player_name = false } = player;

    if (player_name && !checkIfAlreadyMem(player_name)) {
      players.set(client.id, player);

      client.join('world chat');
  
      const update: PlayerUpdate = { type: 'player', player };
      broadcastToWorld(update);
  
      const { player_name } = player;
      const message: ChatHistoryItem = {
        player_name,
        message: `${player_name} has joined the chat!`,
        type: 'notification'
      }
  
      broadcastToWorld(message);
    }
  };


  return {
    broadcastToWorld,
    getChatHistory,
    joinWorldChat,
    leaveWorldChat,
    getWorldChatPlayers,
    broadcastMessage
  }
};
