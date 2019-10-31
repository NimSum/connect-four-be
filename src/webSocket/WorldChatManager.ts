const players = new Map<any,any>();
const chatContainer: Array<ChatHistoryItem> = [];

module.exports = function(client: any, io: any) {
  function broadcastMessage(message: string) {

  return {
    broadcastToWorld,
    getChatHistory,
    joinWorldChat,
    leaveWorldChat,
    getWorldChatPlayers,
    broadcastMessage
  }
};
