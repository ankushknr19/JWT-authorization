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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogoutController = void 0;
const user_model_1 = require("../../models/user.model");
const userLogoutController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.userId;
        const user = yield user_model_1.userModel.findById(userId);
        if (!user)
            throw new Error();
        yield user_model_1.userModel.updateOne({ _id: userId }, { $unset: { refreshTokenId: '' } });
        res.clearCookie('accessToken', { path: '/', httpOnly: true });
        res.clearCookie('refreshToken', { path: '/', httpOnly: true });
        res.status(200).send('logged out successfully');
    }
    catch (error) {
        res.status(404).send('logout failed');
    }
});
exports.userLogoutController = userLogoutController;
//# sourceMappingURL=logout.controller.js.map