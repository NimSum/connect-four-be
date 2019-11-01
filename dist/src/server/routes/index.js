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
const express = require('express');
const router = express.Router();
const params = require('../middleware/paramsVerification');
const loginAuthentication = require('../middleware/loginAuthentication');
const jwt = require('../../utils/jwtAuthentication');
const db = require('../../db');
router.post('/signup', params.checkSignupParams, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPlayer = yield db.createNewPlayer(req.body);
        const { player_name, email } = newPlayer;
        const token = yield jwt.generateToken({ player_name, email });
        res.status(201).json({ token, player: newPlayer });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/login', params.checkLoginParams, loginAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { player_name, _id } = req.playerFound;
    try {
        const token = yield jwt.generateToken({ player_name, _id });
        res.status(200).json({ token, player: req.playerFound });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/anonymous', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { player_name } = req.body;
    try {
        if (!!player_name && player_name.length > 2) {
            const token = yield jwt.generateToken({ player_name, player_type: 'anonymous' });
            res.status(200).json({ token });
        }
        else {
            res.status(400).json({ error: 'Name must be 3-15 characters' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map