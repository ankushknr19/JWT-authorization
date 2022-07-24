"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwtRefreshToken = exports.signJwtAccessToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
dotenv_1.default.config();
const signJwtAccessToken = (res, payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.accessTokenSecretKey, {
        expiresIn: process.env.accessTokenTimeToLive,
    });
    res.cookie('accessToken', accessToken, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: true,
    });
    return accessToken;
};
exports.signJwtAccessToken = signJwtAccessToken;
const signJwtRefreshToken = (res, userId) => {
    const refreshTokenId = (0, uuid_1.v4)();
    const refreshToken = jsonwebtoken_1.default.sign({
        id: refreshTokenId,
        userId,
    }, process.env.refreshTokenSecretKey, {
        expiresIn: process.env.refreshTokenTimeToLive,
    });
    res.cookie('refreshToken', refreshToken, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: true,
    });
    return { refreshToken, refreshTokenId };
};
exports.signJwtRefreshToken = signJwtRefreshToken;
//# sourceMappingURL=sign.jwt.utils.js.map