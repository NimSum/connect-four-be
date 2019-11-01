"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const playerSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    player_name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    secret_one: { type: String, required: true },
    secret_two: { type: String, required: true },
    win_streak: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    games_played: { type: Number, default: 0 },
    friends: [String],
    achievements: [Number],
    game_history: [
        {
            vs_player: String,
            vs_player_id: String,
            is_winner: Boolean,
            created_at: Date
        }
    ]
}, { timestamps: { createdAt: 'created_at' } });
module.exports = {
    Player: mongoose.models.player || mongoose.model('player', playerSchema)
};
//# sourceMappingURL=models.js.map