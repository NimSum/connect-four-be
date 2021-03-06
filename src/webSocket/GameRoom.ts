export {};

const Grid = require("./Grid");
const { winnerStatUpdate, loserStatUpdate } = require("../db");

interface GameChat {
	player_name?: string;
	timestamp?: number;
	message: string;
	type: string;
}

interface Player {
	player_name: string;
	_id: string;
	exp: number;
	iat: number;
	clientId: string;
	isReady: boolean;
	inRoom: string;
	chipColor: string;
	player_type: string;
}

interface ReadyObject {
	isReady: boolean;
	chipColor: string;
}

class GameRoom {
	players: [Player, Player];
	roomDetails: object;
	currentGrid: Grid;
	currentChat: Array<GameChat>;
	currentPlayer: number;
	broadcast: Function;
	status: string;
	roomId: string;
	deleteMe: Function;
	hasPassword: Boolean;
	prevSlot: [number, number, number];

	constructor(
		roomId: string,
		name: string,
		password: string,
		broadcast: Function,
		deleteMe: Function
	) {
		this.players = [null, null];
		this.roomDetails = { name, password };
		this.broadcast = broadcast;
		this.currentGrid = new Grid();
		this.currentChat = [];
		this.currentPlayer = null;
		this.status = "";
		this.roomId = roomId;
		this.deleteMe = deleteMe;
		this.hasPassword = !!password.length;
		this.prevSlot = [0, 0, 0];
	}

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
	}

	broadcastMessage(message: GameChat) {
		this.currentChat.push(message);
		this.broadcastGameUpdate(message);
	}

	insertChip(xCoorDinate: number, clientId: string) {
		const player = this.players[this.currentPlayer];

		if (player) {
			if (player.clientId === clientId) {
				const coordinate: [
					number,
					number,
					number
				] = this.currentGrid.insertChip(xCoorDinate, this.currentPlayer + 1);
				this.prevSlot = coordinate;

				if (this.currentGrid.checkWinner(this.currentPlayer + 1)) {
					this.activeGameUpdate(true);
					const loser =
						player.player_name === this.players[0].player_name
							? this.players[1]
							: this.players[0];
					this.gameOver(player, loser);
				} else {
					this.switchPlayer();
				}
			}
		}
	}

	updatePlayerStats(winner: Player, loser: Player) {
		if (winner.player_type === "registered") {
			const { player_name, _id = "anonymous" } = loser;
			const opponent = {
				vs_player: player_name,
				vs_player_id: _id,
				created_at: new Date(),
				is_winner: true
			};
			winnerStatUpdate(winner._id, opponent);
		}
		if (loser.player_type === "registered") {
			const { player_name, _id = "anonymous" } = winner;
			const opponent = {
				vs_player: player_name,
				vs_player_id: _id,
				created_at: new Date(),
				is_winner: false
			};
			loserStatUpdate(loser._id, opponent);
		}
	}

	gameOver(winner: Player, loser: Player) {
		const message = {
			message: `${winner.player_name} WINS!`,
			type: "notification"
		};
		const update = {
			type: "gameOver",
			winner: winner.player_name
		};
		this.updatePlayerStats(winner, loser);
		this.broadcastGameUpdate(update);
		this.broadcastMessage(message);

		if (this.players[0] && this.players[1]) {
			this.resetGame(false);
		} else {
			this.resetGame(true);
		}
	}

	resetGame(playerLeft: boolean) {
		this.currentGrid = new Grid();
		this.currentPlayer = null;
		this.prevSlot = [0, 0, 0];
		this.players.forEach(player => {
			if (player) {
				player.isReady = false;
			}
		});

		if (playerLeft) {
			this.status = "waiting";
			this.activeGameUpdate(false);
		} else {
			this.status = "full";
		}
	}

	activeGameUpdate(isActive: boolean) {
		const active = {
			type: "activeUpdate",
			status: this.status,
			prevSlot: this.prevSlot,
			currentPlayer: this.players[this.currentPlayer] || null
		};
		const inactive = {
			type: "inactiveUpdate",
			status: this.status,
			players: this.players
		};

		this.broadcastGameUpdate(isActive ? active : inactive);
	}

	switchPlayer() {
		this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
		this.activeGameUpdate(true);
	}

	setPlayerReady(data: ReadyObject, clientId: string) {
		const idx: number = this.findPlayerByClientId(clientId);
		const { chipColor, isReady } = data;
		this.players[idx].isReady = isReady;
		this.players[idx].chipColor = chipColor;
		this.activeGameUpdate(false);

		if (this.players[0] && this.players[1]) {
			if (this.players[0].isReady && this.players[1].isReady) {
				this.startGame();
			}
		}
	}

	startGame() {
		this.currentPlayer = Math.round(Math.random());
		this.status = "active";
		const { player_name } = this.players[this.currentPlayer];
		const selectedMessage = {
			message: `${player_name} was selected to go first!`,
			type: "notification"
		};

		this.broadcastMessage(selectedMessage);
		this.activeGameUpdate(true);
	}

	addPlayer(clientId: string, player: any) {
		const newPlayer = {
			clientId,
			...player,
			isReady: false,
			chipColor: ""
		};

		if (!this.players[0]) {
			this.players[0] = newPlayer;
			if (this.players[1]) this.status = "full";
			else this.status = "waiting";
			this.activeGameUpdate(false);
		} else if (!this.players[1]) {
			this.players[1] = newPlayer;
			this.status = "full";
			this.activeGameUpdate(false);
		}

		this.broadcastMessage({
			message: `${newPlayer.player_name} has joined.`,
			type: "notification"
		});
	}

	removePlayer(clientId: string) {
		const playerSlot: number = this.findPlayerByClientId(clientId);
		const loser: Player = { ...this.players[playerSlot] };

		this.players[playerSlot] = null;

		if (this.status === "active") {
			const message = {
				message: `${loser.player_name} has left/forfeited the match.`,
				type: "notification"
			};
			const winner = this.players[0] || this.players[1];
			this.gameOver(winner, loser);
			this.broadcastMessage(message);
		} else if (!this.players[0] && !this.players[1]) {
			this.removeThisGameRoom();
		} else {
			this.status = "waiting";
			this.activeGameUpdate(false);
		}
	}

	removeThisGameRoom() {
		this.deleteMe(this.roomId);
	}

	findPlayerByClientId(clientId: string): number {
		return this.players.findIndex(player => {
			if (player !== null) return player.clientId === clientId;
		});
	}
}

module.exports = GameRoom;
