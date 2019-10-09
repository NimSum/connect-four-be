module.exports = function({ name, id }) {
  const players = new Map<string, any>();

  let currentGrid: Array<number> = [];

  function broadcastGrid(grid: Array<number>) {
    players.forEach(player => player.emit('gridUpdate', {grid, players}));
  };

  function updateCurrentGrid(grid: Array<number>) {
    currentGrid = grid;
  };

  function getCurrentGrid(): Array<number> {
    return currentGrid.slice();
  };

  function addPlayer(client: any, player) {
    if (players.size < 2) players.set(client.id, {client, player} );

    client.emit('join', { message: 'HIIIIIII'})

    console.log(players);

  };

  function removePlayer(client) {
    players.delete(client.id);
  };

  function serialize() {
    return {
      name,
      id,
      totalPlayers: players.size
    };
  };

  return {
    broadcastGrid,
    updateCurrentGrid,
    getCurrentGrid,
    addPlayer,
    removePlayer,
    serialize
  }
};
