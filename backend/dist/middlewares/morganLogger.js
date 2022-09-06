"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("../config/env");
const winstonLogger_1 = __importDefault(require("./winstonLogger"));
const stream = {
    write: (message) => winstonLogger_1.default.http(message),
};
const skip = () => {
    const env = env_1.NODE_ENV || 'development';
    return env !== 'development';
};
const morganLogger = (0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms', { stream, skip });
exports.default = morganLogger;
//# sourceMappingURL=morganLogger.js.map