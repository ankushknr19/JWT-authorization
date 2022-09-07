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
exports.userLogoutController = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const user_model_1 = require("../../models/user.model");
const userLogoutController = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.userId;
        if (!userId)
            throw new http_errors_1.default.Unauthorized();
        const user = yield user_model_1.UserModel.findById(userId);
        if (!user)
            throw new http_errors_1.default.Unauthorized();
        yield user_model_1.UserModel.updateOne({ _id: userId }, { $unset: { refreshTokenId: '' } });
        res.clearCookie('accessToken', { path: '/', httpOnly: true });
        res.clearCookie('refreshToken', { path: '/', httpOnly: true });
        res.status(200).send('logged out successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.userLogoutController = userLogoutController;
//# sourceMappingURL=logout.controller.js.map