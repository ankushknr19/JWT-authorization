"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshTokenAsync = exports.signAccessTokenAsync = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const env_1 = require("../../config/env");
const signAccessTokenAsync = (res, payload) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, env_1.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: env_1.ACCESS_TOKEN_TIME_TO_LIVE,
        }, (err, accessToken) => {
            if (err) {
                return reject(new http_errors_1.default.InternalServerError());
            }
            res.cookie('accessToken', accessToken, {
                path: '/',
                maxAge: 30 * 24 * 60 * 60,
                httpOnly: true,
            });
            resolve(accessToken);
        });
    });
};
exports.signAccessTokenAsync = signAccessTokenAsync;
const signRefreshTokenAsync = (res, userId) => {
    return new Promise((resolve, reject) => {
        const refreshTokenId = (0, uuid_1.v4)();
        jsonwebtoken_1.default.sign({
            id: refreshTokenId,
            userId,
        }, env_1.REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: env_1.REFRESH_TOKEN_TIME_TO_LIVE,
        }, (err, refreshToken) => {
            if (err) {
                return reject(new http_errors_1.default.InternalServerError());
            }
            res.cookie('refreshToken', refreshToken, {
                path: '/',
                maxAge: 30 * 24 * 60 * 60,
                httpOnly: true,
            });
            resolve({ refreshToken, refreshTokenId });
        });
    });
};
exports.signRefreshTokenAsync = signRefreshTokenAsync;
//# sourceMappingURL=sign.jwt.utils.js.map