const players = new Map<any, any>();
const chatContainer: Array<ChatHistoryItem> = [];

module.exports = function(client: any, io: any) {
	function broadcastMessage(message: string) {
		if (message.length > 0) {
			const { player_name } = players.get(client.id) || {};
			const setMessage = { message, player_name, timestamp: Date.now() };
			chatContainer.push(setMessage);

			const update: ChatHistoryItem = { type: "message", ...setMessage };
			broadcastToWorld(update);
		}
	}

	function broadcastToWorld(update: ChatHistoryItem | PlayerUpdate) {
		io.to("world chat").emit("world chat update", update);
	}

	function joinWorldChat(player: Player) {
		const { player_name = false } = player;

		if (player_name && !checkIfAlreadyMem(player_name)) {
			players.set(client.id, player);

			client.join("world chat");

			const update: PlayerUpdate = { type: "player", player };
			broadcastToWorld(update);

			const { player_name } = player;
			const message: ChatHistoryItem = {
				player_name,
				message: `${player_name} has joined the chat!`,
				type: "notification"
			};

			broadcastToWorld(message);
		}
	}

	function leaveWorldChat() {
		const player: Player = players.get(client.id) || {};
		const { player_name } = player;
		const update = { type: "player", update_type: "delete", player };
		const message: ChatHistoryItem = {
			player_name,
			message: `${player_name} has left the chat.`,
			type: "notification"
		};

		if (!!player_name) {
			players.delete(client.id);
			broadcastToWorld(update);
			broadcastToWorld(message);

			client.leave("world chat");
		}
	}

	function getWorldChatPlayers() {
		io.sockets.connected[client.id].emit(
			"send world chat players",
			Array.from(players.values())
		);
	}

	function checkIfAlreadyMem(player_name: string) {
		return Array.from(players.values()).some(
			player => player.player_name === player_name
		);
	}

	function getChatHistory(msgAmount: number): Array<ChatHistoryItem> {
		const totalMessages: number =
			chatContainer.length - msgAmount > 0
				? chatContainer.length - msgAmount
				: 0;

		return chatContainer.slice(totalMessages, chatContainer.length);
	}

	return {
		broadcastToWorld,
		getChatHistory,
		joinWorldChat,
		leaveWorldChat,
		getWorldChatPlayers,
		broadcastMessage
	};
};

interface ChatHistoryItem {
	player_name: string;
	message: string;
	timestamp?: number;
	type?: string;
}

interface PlayerUpdate {
	player: Player;
	type: string;
}

interface Player {
	player_name: string;
	win_streak: number;
	_id: string;
	wins: number;
	losses: number;
}
