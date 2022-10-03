"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const winstonLogger_1 = __importDefault(require("./winstonLogger"));
const errorHandler = (error, _req, res, _next) => {
    winstonLogger_1.default.error(error);
    const errorObject = {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
    };
    res.render('error', { errorObject });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map