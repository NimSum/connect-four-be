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
const mongoose = require('mongoose');
const { mongoURI } = require('../../config/keys');
const { Player } = require('./models');
const { encryptText } = require('../utils/passwordEncryptions');
const { ObjectId } = mongoose.Types;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch((error) => {
    throw new Error(error);
});
function createNewPlayer(player) {
    return __awaiter(this, void 0, void 0, function* () {
        const { player_name, email, password, secret_one, secret_two } = player;
        const newPlayer = new Player({
            _id: new mongoose.Types.ObjectId(),
            player_name,
            email,
            password: yield encryptText(password),
            secret_one,
            secret_two
        });
        return yield newPlayer.save();
    });
}
;
function getPlayer(isEmail, player) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = isEmail ? 'email' : 'player_name';
        return yield Player.findOne({ [type]: player });
    });
}
;
function getPlayerById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Player.findById(id);
    });
}
;
function winnerStatUpdate(id, opponent) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Player.findOneAndUpdate({ _id: id }, {
            $inc: { 'games_played': 1, 'wins': 1, 'win_streak': 1 },
            $push: { 'game_history': opponent }
        });
    });
}
;
function loserStatUpdate(id, opponent) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Player.findOneAndUpdate({ _id: id }, {
            $inc: { 'games_played': 1, 'losses': 1 },
            $push: { 'game_history': opponent },
            'win_streak': 0,
        });
    });
}
;
module.exports = {
    createNewPlayer,
    getPlayer,
    getPlayerById,
    winnerStatUpdate,
    loserStatUpdate
};
//# sourceMappingURL=index.js.map