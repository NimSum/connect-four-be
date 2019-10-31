module.exports = function({ name, id }) {
  const players = new Map<string, any>();

  let currentGrid: Array<number> = [];

  /// ACTIVE GAME
  insertChip(xCoorDinate: number, clientId: string) {
    const player = this.players[this.currentPlayer];
    
    if (player) {
      if (player.clientId === clientId) {
        const coordinate: [number, number, number] = this.currentGrid
          .insertChip(xCoorDinate, (this.currentPlayer + 1));
        this.prevSlot = coordinate;

        if (this.currentGrid.checkWinner(this.currentPlayer + 1)) {
          this.activeGameUpdate(true);
          const loser = player.player_name === this.players[0].player_name
            ? this.players[1]
            : this.players[0];
          this.gameOver(player, loser);
        } else {
          this.switchPlayer();
        }
      }
    }
  };

    const player = this.players[this.currentPlayer];
    
    if (player) {
      if (player.clientId === clientId) {
        const coordinate: [number, number, number] = this.currentGrid
          .insertChip(xCoorDinate, (this.currentPlayer + 1));
        this.prevSlot = coordinate;

        if (this.currentGrid.checkWinner(this.currentPlayer + 1)) {
          this.activeGameUpdate(true);
          const loser = player.player_name === this.players[0].player_name
            ? this.players[1]
            : this.players[0];
          this.gameOver(player, loser);
        } else {
          this.switchPlayer();
        }
      }
    }
  };
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
