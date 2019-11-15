export {};
const GameRoom = require("./GameRoom");
const uuidv4 = require("uuid/v4");
const db = require("../db");
const { verifyToken } = require("../utils/jwtAuthentication");

const gameRooms = new Map();
const clients = new Map();

module.exports = function(client: any, io: any) {
	function broadcastGameRoomUpdates(payload: object) {
		io.sockets.emit("game rooms update", payload);
	}

	function sendAllGameRooms() {
		io.sockets.connected[client.id].emit(
			"send all game rooms",
			Array.from(gameRooms.values()).map(room => serializeRoom(room))
		);
	}

	function broadcastGameUpdate(clientId: string, payload: object) {
		io.sockets.connected[clientId].emit("active game update", payload);
	}

	async function registerClient(token: string) {
		try {
			const validToken = await verifyToken(`Bearer ${token}`);
			if (validToken && !!validToken._id) {
				const { _id } = validToken;
				const player = await db.getPlayerById(_id);
				if (player) {
					clients.set(client.id, serializePlayer(player[0]));
					console.log("Online: ", clients.size);
				}
				sendAllGameRooms();
			} else {
				clients.set(client.id, serializePlayer(validToken));
				console.log("Online: ", clients.size);
			}
		} catch (err) {
			io.sockets.connected[client.id].emit("socket has errored", {
				type: "registration",
				error: "Failed to register client"
			});
		}
	}

	function removeClient() {
		leaveRoom();
		clients.delete(client.id);
		console.log("Online: ", clients.size);
	}

	function createGameRoom({
		name,
		password
	}: {
		name: string;
		password: string;
	}) {
		const newId: string = uuidv4();
		const player: Player = getPlayerByClientId();

		if (player) {
			const newRoom = new GameRoom(
				newId,
				name,
				password || "",
				broadcastGameUpdate,
				removeGameRoom
			);
			player.inRoom = newId;
			newRoom.addPlayer(client.id, player);
			gameRooms.set(newId, newRoom);

			const updateMessage = {
				...serializeRoom(newRoom),
				updateType: "addRoom"
			};
			broadcastGameRoomUpdates(updateMessage);
		}
	}

	function joinGameRoom(details: { roomId: string; password: string }) {
		const { roomId, password } = details;
		const room: any = getGameRoomById(roomId);

		if (room && room.roomDetails.password === password) {
			const player = getPlayerByClientId();
			player.inRoom = roomId;
			room.addPlayer(client.id, player);

			const updateMessage = {
				...serializeRoom(room),
				updateType: "updateRoom"
			};
			broadcastGameRoomUpdates(updateMessage);
		}
	}

	function leaveRoom() {
		const player: Player = getPlayerByClientId();
		const room: any = getGameRoomById(player.inRoom);

		if (room && player) {
			player.inRoom = "";
			room.removePlayer(client.id);
			if (!!room.players[0] || !!room.players[1]) {
				const updateMessage = {
					...serializeRoom(room),
					updateType: "updateRoom"
				};
				broadcastGameRoomUpdates(updateMessage);
			}
		}
	}

	function removeGameRoom(roomId) {
		gameRooms.delete(roomId);

		const updateMessage = { roomId, updateType: "deleteRoom" };
		broadcastGameRoomUpdates(updateMessage);
	}

	function getGameRoomById(roomId: string): any {
		return gameRooms.get(roomId) || false;
	}

	function serializeRoom(room: any): SerializedRoom {
		const { roomId, players, roomDetails, status, hasPassword } = room;
		return {
			roomId,
			players,
			name: roomDetails.name,
			hasPassword,
			status
		};
	}

	function serializePlayer(player: any): Player {
		const {
			win_streak = null,
			wins = null,
			losses = null,
			player_name,
			player_type = "registered",
			_id
		} = player;

		return {
			win_streak,
			wins,
			losses,
			player_name,
			_id,
			player_type
		};
	}

	function getPlayerByClientId(): Player {
		const player = clients.get(client.id) || false;
		return player;
	}

	function handleSetPlayerReady(data: { isReady: boolean; chipColor: string }) {
		const player = getPlayerByClientId();
		const room = getGameRoomById(player.inRoom);

		if (room && player) {
			room.setPlayerReady(data, client.id);
		}
	}

	function handleChipPlacement(xCoordinate: number) {
		const player: Player = getPlayerByClientId();
		const room = getGameRoomById(player.inRoom);

		if (room && player) room.insertChip(xCoordinate, client.id);
	}

	function handleInGameChat(payload: string) {
		const player: Player = getPlayerByClientId();
		const room = getGameRoomById(player.inRoom);

		if (room && player) {
			const message = {
				player_name: player.player_name,
				timestamp: Date.now(),
				message: payload,
				type: "message"
			};
			room.broadcastMessage(message);
		}
	}

	return {
		removeClient,
		registerClient,
		getGameRoomById,
		createGameRoom,
		removeGameRoom,
		getPlayerByClientId,
		joinGameRoom,
		leaveRoom,
		handleSetPlayerReady,
		handleChipPlacement,
		handleInGameChat
	};
};

interface Player {
	win_streak: number;
	wins: number;
	losses: number;
	player_name: string;
	player_type: string;
	_id: string;
	inRoom?: string;
}

interface SerializedRoom {
	roomId: string;
	players: Array<any>;
	name: string;
	hasPassword: boolean;
	status: string;
}
