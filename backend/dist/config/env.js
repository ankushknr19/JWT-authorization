"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_TIME_TO_LIVE = exports.ACCESS_TOKEN_TIME_TO_LIVE = exports.REFRESH_TOKEN_SECRET_KEY = exports.ACCESS_TOKEN_SECRET_KEY = exports.SALT_ROUND = exports.MONGO_COMPASS_URI = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.NODE_ENV = process.env.NODE_ENV;
exports.MONGO_COMPASS_URI = process.env.MONGO_COMPASS_URI;
exports.SALT_ROUND = process.env.SALT_ROUND;
exports.ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
exports.REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;
exports.ACCESS_TOKEN_TIME_TO_LIVE = process.env.ACCESS_TOKEN_TIME_TO_LIVE;
exports.REFRESH_TOKEN_TIME_TO_LIVE = process.env.REFRESH_TOKEN_TIME_TO_LIVE;
//# sourceMappingURL=env.js.map