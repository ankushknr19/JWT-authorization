"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_TIME_TO_LIVE = exports.ACCESS_TOKEN_TIME_TO_LIVE = exports.REFRESH_TOKEN_SECRET_KEY = exports.ACCESS_TOKEN_SECRET_KEY = exports.SALT_ROUND = exports.MONGO_COMPASS_URI = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 5000;
exports.NODE_ENV = process.env.NODE_ENV;
exports.MONGO_COMPASS_URI = process.env.mongoCompassURI;
exports.SALT_ROUND = process.env.SALT_ROUND;
exports.ACCESS_TOKEN_SECRET_KEY = process.env.accessTokenSecretKey;
exports.REFRESH_TOKEN_SECRET_KEY = process.env.refreshTokenSecretKey;
exports.ACCESS_TOKEN_TIME_TO_LIVE = process.env.accessTokenTimeToLive;
exports.REFRESH_TOKEN_TIME_TO_LIVE = process.env.refreshTokenTimeToLive;
//# sourceMappingURL=env.js.map