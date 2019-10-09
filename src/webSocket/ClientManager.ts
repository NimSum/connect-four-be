module.exports = function() {
  const clients = new Map();

  const mockPlayers = [
    {
      gamer_tag: 'nimsum',
      id: '1',
      statusTag: 'coding',
      wins: 1000,
      losses: 100,
      total_games: 1100
    },
    {
      gamer_tag: 'dimsum',
      id: '2',
      statusTag: 'winning',
      wins: 100,
      losses: 50,
      total_games: 150
    }
  ];

  function addClient(client: any) {
    clients.set(client.id, { client });
  };

  function registerClient(client, player) {
    clients.set(client.id, { client, player });
    console.log(clients); 
  };

  function removeClient(client) {
    clients.delete(client.id);
  };

  function getAvailablePlayers() {
    const playersTaken = new Set(
      Array.from(clients.values())
        .filter(c => c.player)
        .map(c => c.player.id)
    )

    return Array.from(clients.values())
      .filter(player => !playersTaken.has(player.id))
  };

  function getPlayerById(playerId) {
    return mockPlayers.find(player => player.id === playerId);
  };

  function getPlayerByClientId(clientId) {
    return (clients.get(clientId) || {}).user;
  };

  return {
    addClient,
    registerClient,
    removeClient,
    getPlayerByClientId,
    getPlayerById,
    getAvailablePlayers
  };
  
};
