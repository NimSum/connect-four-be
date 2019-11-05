"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameRoom = require('./GameRoom');
const uuidv4 = require('uuid/v4');
const db = require('../db');
const { verifyToken } = require('../utils/jwtAuthentication');
const gameRooms = new Map();
const clients = new Map();
module.exports = function (client, io) {
    //// EMITTERS
    function broadcastGameRoomUpdates(payload) {
        io.sockets.emit('game rooms update', payload);
    }
    ;
    function sendAllGameRooms() {
        io.sockets.connected[client.id]
            .emit('send all game rooms', Array.from(gameRooms.values())
            .map(room => serializeRoom(room)));
    }
    ;
    function broadcastGameUpdate(clientId, payload) {
        io.sockets.connected[clientId].emit('active game update', payload);
    }
    ;
    //// CLIENT REGISTRATION
    function registerClient(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validToken = yield verifyToken(`Bearer ${token}`);
                if (validToken && !!validToken._id) {
                    const { _id } = validToken;
                    const player = yield db.getPlayerById(_id);
                    if (player._id) {
                        clients.set(client.id, serializePlayer(player));
                        console.log('Online: ', clients.size);
                    }
                    sendAllGameRooms();
                }
                else {
                    clients.set(client.id, serializePlayer(validToken));
                    console.log('Online: ', clients.size);
                }
            }
            catch (err) {
                io.sockets.connected[client.id]
                    .emit('socket has errored', {
                    type: 'registration',
                    error: 'Failed to register client'
                });
            }
        });
    }
    ;
    function removeClient() {
        leaveRoom();
        clients.delete(client.id);
        console.log('Online: ', clients.size);
    }
    ;
    //// ROOM INTERACTION
    function createGameRoom({ name, password }) {
        const newId = uuidv4();
        const player = getPlayerByClientId();
        if (player) {
            const newRoom = new GameRoom(newId, name, password || '', broadcastGameUpdate, removeGameRoom);
            player.inRoom = newId;
            newRoom.addPlayer(client.id, player);
            gameRooms.set(newId, newRoom);
            const updateMessage = Object.assign(Object.assign({}, serializeRoom(newRoom)), { updateType: 'addRoom' });
            broadcastGameRoomUpdates(updateMessage);
        }
    }
    ;
    function joinGameRoom(details) {
        const { roomId, password } = details;
        const room = getGameRoomById(roomId);
        if (room && room.roomDetails.password === password) {
            const player = getPlayerByClientId();
            player.inRoom = roomId;
            room.addPlayer(client.id, player);
            const updateMessage = Object.assign(Object.assign({}, serializeRoom(room)), { updateType: 'updateRoom' });
            broadcastGameRoomUpdates(updateMessage);
        }
    }
    ;
    function leaveRoom() {
        const player = getPlayerByClientId();
        const room = getGameRoomById(player.inRoom);
        if (room && player) {
            player.inRoom = '';
            room.removePlayer(client.id);
            if (!!room.players[0] || !!room.players[1]) {
                const updateMessage = Object.assign(Object.assign({}, serializeRoom(room)), { updateType: 'updateRoom' });
                broadcastGameRoomUpdates(updateMessage);
            }
        }
    }
    ;
    function removeGameRoom(roomId) {
        gameRooms.delete(roomId);
        const updateMessage = { roomId, updateType: 'deleteRoom' };
        broadcastGameRoomUpdates(updateMessage);
    }
    ;
    //// UTILITY
    function getGameRoomById(roomId) {
        return gameRooms.get(roomId) || false;
    }
    ;
    function serializeRoom(room) {
        const { roomId, players, roomDetails, status, hasPassword } = room;
        return {
            roomId,
            players,
            name: roomDetails.name,
            hasPassword,
            status
        };
    }
    ;
    function serializePlayer(player) {
        const { win_streak = null, wins = null, losses = null, player_name, player_type = 'registered', _id } = player;
        return {
            win_streak,
            wins,
            losses,
            player_name,
            _id,
            player_type
        };
    }
    ;
    function getPlayerByClientId() {
        const player = clients.get(client.id) || false;
        return player;
    }
    ;
    //// ACTIVE GAME ROOM
    function handleSetPlayerReady(data) {
        const player = getPlayerByClientId();
        const room = getGameRoomById(player.inRoom);
        if (room && player) {
            room.setPlayerReady(data, client.id);
        }
    }
    function handleChipPlacement(xCoordinate) {
        const player = getPlayerByClientId();
        const room = getGameRoomById(player.inRoom);
        if (room && player)
            room.insertChip(xCoordinate, client.id);
    }
    function handleInGameChat(payload) {
        const player = getPlayerByClientId();
        const room = getGameRoomById(player.inRoom);
        if (room && player) {
            const message = {
                player_name: player.player_name,
                timestamp: Date.now(),
                message: payload,
                type: 'message'
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
;
//# sourceMappingURL=GameRoomManager.js.map