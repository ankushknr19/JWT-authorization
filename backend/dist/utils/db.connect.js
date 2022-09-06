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
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../config/env");
const winstonLogger_1 = __importDefault(require("../middlewares/winstonLogger"));
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dbURI = env_1.MONGO_COMPASS_URI || '';
            yield mongoose_1.default.connect(dbURI);
        }
        catch (error) {
            winstonLogger_1.default.error('error during inital connection to mongodb database');
            process.exit(1);
        }
    });
}
exports.connectDB = connectDB;
mongoose_1.default.connection.on('connected', () => winstonLogger_1.default.info('Mongoose connected...'));
mongoose_1.default.connection.on('error', (err) => winstonLogger_1.default.error(err.message));
mongoose_1.default.connection.on('disconnected', () => winstonLogger_1.default.warn('Mongoose disconnected.'));
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
//# sourceMappingURL=db.connect.js.map