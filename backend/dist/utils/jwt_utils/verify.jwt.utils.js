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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = require("lodash");
const user_model_1 = require("../../models/user.model");
dotenv_1.default.config();
const verifyAccessToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.accessTokenSecretKey);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (error) {
        return {
            valid: false,
            expired: true,
            decoded: null,
        };
    }
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.refreshTokenSecretKey);
        const dbSearch = yield user_model_1.userModel
            .findById((0, lodash_1.get)(decoded, 'userId'))
            .select('refreshTokenId');
        if (!dbSearch) {
            throw new Error();
        }
        if ((0, lodash_1.get)(decoded, 'id') !== dbSearch.refreshTokenId) {
            throw new Error();
        }
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (error) {
        return {
            valid: false,
            expired: true,
            decoded: null,
        };
    }
});
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=verify.jwt.utils.js.map