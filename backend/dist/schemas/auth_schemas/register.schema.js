"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userRegisterSchema = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().required(),
    password: joi_1.default.string().min(6).max(30).required(),
    role: joi_1.default.string().valid('user', 'moderator', 'admin'),
});
//# sourceMappingURL=register.schema.js.map