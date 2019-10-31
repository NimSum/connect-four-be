export{};

const Grid = require('./Grid');
const { winnerStatUpdate, loserStatUpdate } = require('../db');

interface GameChat {
  player_name?: string,
  timestamp?: number,
  message: string,
  type: string,
}

interface Player {
  player_name: string,
  _id: string,
  exp: number,
  iat: number,
  clientId: string,
  isReady: boolean;
  inRoom: string;
  chipColor: string;
  player_type: string
};

interface ReadyObject {
  isReady: boolean,
  chipColor: string
}

class GameRoom {
  players: [Player, Player];
  roomDetails: object;
  /// BROADCASTS
  broadcastGameUpdate(payload: object) {
    if (!this.players[0] && !this.players[1]) {
      this.removeThisGameRoom();
    } else {
      this.players.forEach(player => {
        if (player !== null) {
          this.broadcast(player.clientId, payload);
        }
      });
    }
  };

  currentGrid: Grid;
  currentChat: Array<GameChat>;
  currentPlayer: number;
  broadcast: Function;
  status: string;
  roomId: string;
  deleteMe: Function;
  hasPassword: Boolean;
  prevSlot: [number, number, number];

  constructor(roomId: string, name: string, password: string, broadcast: Function, deleteMe: Function) {
    this.players = [null, null];
    this.roomDetails = { name, password };
    this.broadcast = broadcast;
    this.currentGrid = new Grid();
    this.currentChat = [];
    this.currentPlayer = null;
    this.status = '';
    this.roomId = roomId;
    this.deleteMe = deleteMe;
    this.hasPassword = !!password.length;
    this.prevSlot = [0, 0, 0];
  };

  /// BROADCASTS
  broadcastGameUpdate(payload: object) {
    if (!this.players[0] && !this.players[1]) {
      this.removeThisGameRoom();
    } else {
      this.players.forEach(player => {
        if (player !== null) {
          this.broadcast(player.clientId, payload);
        }
      });
    }
  };

  broadcastMessage(message: GameChat) {
    this.currentChat.push(message);
    this.broadcastGameUpdate(message);
  };

  /// ACTIVE GAME
  insertChip(xCoorDinate: number, clientId: string) {
    const player = this.players[this.currentPlayer];
    
    if (player) {
      if (player.clientId === clientId) {
        const coordinate: [number, number, number] = this.currentGrid
          .insertChip(xCoorDinate, (this.currentPlayer + 1));
        this.prevSlot = coordinate;

  updatePlayerStats(winner: Player, loser: Player) {
    if (winner.player_type === 'registered') {
      const { player_name, _id = 'anonymous' } = loser;
      const opponent = {
        vs_player: player_name,
        vs_player_id: _id,
        created_at: new Date(),
        is_winner: true
      };
      winnerStatUpdate(winner._id, opponent);
    };
    if (loser.player_type === 'registered') {
      const { player_name, _id = 'anonymous' } = winner;
      const opponent = {
        vs_player: player_name,
        vs_player_id: _id,
        created_at: new Date(),
        is_winner: false
      };
      loserStatUpdate(loser._id, opponent)
    };
  };
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
