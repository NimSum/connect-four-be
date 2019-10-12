const { getPlayer } = require('../db/index');

module.exports = function() {
  const clients = new Map();

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

  async function getPlayerByName(player_name) {
    try {
      return await getPlayer(false, player_name);
    } catch(err) {
      return err;
    }
  };

  function getPlayerByClientId(clientId) {
    return (clients.get(clientId) || {}).user;
  };

  return {
    addClient,
    registerClient,
    removeClient,
    getPlayerByClientId,
    getPlayerByName,
    getAvailablePlayers
  };
};
