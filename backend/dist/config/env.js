"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_TIME_TO_LIVE = exports.ACCESS_TOKEN_TIME_TO_LIVE = exports.REFRESH_TOKEN_SECRET_KEY = exports.ACCESS_TOKEN_SECRET_KEY = exports.SALT_ROUND = exports.PORT = exports.MONGO_URI = exports.NODE_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const winstonLogger_1 = __importDefault(require("../middlewares/winstonLogger"));
fs_1.default.existsSync('.env') ? dotenv_1.default.config() : winstonLogger_1.default.error('.env file not found.');
exports.NODE_ENV = process.env.NODE_ENV;
const prod = exports.NODE_ENV === 'production';
exports.MONGO_URI = prod
    ? process.env.MONGO_PROD
    : process.env.MONGO_LOCAL;
exports.PORT = (process.env.PORT || 5600);
exports.SALT_ROUND = (process.env.SALT_ROUND || 10);
exports.ACCESS_TOKEN_SECRET_KEY = process.env
    .ACCESS_TOKEN_SECRET_KEY;
exports.REFRESH_TOKEN_SECRET_KEY = process.env
    .REFRESH_TOKEN_SECRET_KEY;
exports.ACCESS_TOKEN_TIME_TO_LIVE = process.env
    .ACCESS_TOKEN_TIME_TO_LIVE;
exports.REFRESH_TOKEN_TIME_TO_LIVE = process.env
    .REFRESH_TOKEN_TIME_TO_LIVE;
//# sourceMappingURL=env.js.map