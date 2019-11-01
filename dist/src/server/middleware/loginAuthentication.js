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
const db = require('../../db');
const { compareEncryptedText } = require('../../utils/passwordEncryptions');
const { verifyToken } = require('../../utils/jwtAuthentication');
function loginAuthentication(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let playerFound;
        try {
            if (!!req.headers.authorization) {
                const verified = yield verifyToken(req.headers.authorization);
                const id = verified._id;
                const found = yield db.getPlayerById(id);
                playerFound = found[0];
            }
            else {
                const email = req.body.email;
                playerFound = yield db.getPlayer(true, email);
            }
            if (!playerFound) {
                res.status(404).json({ error: 'Invalid login credentials' });
            }
            else {
                const passwordMatch = yield compareEncryptedText(req.body.password || '', playerFound.password || '');
                if (passwordMatch || !!req.headers.authorization) {
                    req.playerFound = playerFound;
                    next();
                }
                else {
                    res.status(404).json({ error: 'Invalid login credentials' });
                }
                ;
            }
            ;
        }
        catch (error) {
            res.status(500).json(error);
        }
        ;
    });
}
;
module.exports = loginAuthentication;
//# sourceMappingURL=loginAuthentication.js.map