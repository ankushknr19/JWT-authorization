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
exports.reissueTokens = exports.verifyRefreshToken = exports.verifyAccessToken = exports.signJwtRefreshToken = exports.signJwtAccessToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const lodash_1 = require("lodash");
const user_model_1 = require("../models/user.model");
dotenv_1.default.config();
const signJwtAccessToken = (res, payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.jwtAccessTokenSecretKey, {
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
    }, process.env.jwtRefreshTokenSecretKey, {
        expiresIn: process.env.accessTokenTimeToLive,
    });
    res.cookie('refreshToken', refreshToken, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: true,
    });
    return { refreshToken, refreshTokenId };
};
exports.signJwtRefreshToken = signJwtRefreshToken;
const verifyAccessToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.jwtAccessTokenSecretKey);
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
        const decoded = jsonwebtoken_1.default.verify(token, process.env.jwtRefreshTokenSecretKey);
        console.log('i am here');
        const dbTokenId = yield user_model_1.userModel
            .findById((0, lodash_1.get)(decoded, 'userId'))
            .select('refreshTokenId');
        if (!dbTokenId) {
            throw new Error();
        }
        if ((0, lodash_1.get)(decoded, 'refreshTokenId') !== dbTokenId) {
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
const reissueTokens = (res, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { decoded, expired } = yield (0, exports.verifyRefreshToken)(refreshToken);
        if (!decoded || !(0, lodash_1.get)(decoded, 'userId') || expired) {
            throw new Error();
        }
        const user = yield user_model_1.userModel.findById((0, lodash_1.get)(decoded, 'userId'));
        if (!user) {
            throw new Error();
        }
        const newAccessToken = (0, exports.signJwtAccessToken)(res, { userId: user._id });
        const { refreshToken: newRefreshToken, refreshTokenId } = (0, exports.signJwtRefreshToken)(res, user._id);
        user.refreshTokenId = refreshTokenId;
        yield user.save();
        return { newAccessToken, newRefreshToken };
    }
    catch (error) {
        console.log('first');
        return error;
    }
});
exports.reissueTokens = reissueTokens;
//# sourceMappingURL=jwt.utils.js.map