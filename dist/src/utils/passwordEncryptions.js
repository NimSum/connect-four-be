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
const bcrypt = require('bcrypt');
const saltRounds = 10;
function encryptText(text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedText = yield bcrypt.hash(text, saltRounds);
            return hashedText;
        }
        catch (err) {
            return err;
        }
    });
}
;
function compareEncryptedText(textOne, textTwo) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(textOne, textTwo);
    });
}
;
module.exports = {
    encryptText,
    compareEncryptedText
};
//# sourceMappingURL=passwordEncryptions.js.map