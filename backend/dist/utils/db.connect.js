"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { mongoCompassURI } = process.env;
function connectDB() {
    try {
        const dbURI = mongoCompassURI || '';
        mongoose_1.default.connect(dbURI, () => console.log('Database connected successfully!'));
    }
    catch (error) {
        console.log('error during inital connection to mongodb database');
    }
    mongoose_1.default.set('debug', true);
}
exports.connectDB = connectDB;
//# sourceMappingURL=db.connect.js.map