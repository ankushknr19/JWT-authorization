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
exports.reissueTokens = void 0;
const lodash_1 = require("lodash");
const user_model_1 = require("../../models/user.model");
const sign_jwt_utils_1 = require("./sign.jwt.utils");
const verify_jwt_utils_1 = require("./verify.jwt.utils");
const reissueTokens = (res, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { decoded, expired } = yield (0, verify_jwt_utils_1.verifyRefreshToken)(refreshToken);
        if (!decoded || !(0, lodash_1.get)(decoded, 'userId') || expired) {
            throw new Error();
        }
        const user = yield user_model_1.userModel.findById((0, lodash_1.get)(decoded, 'userId'));
        if (!user) {
            throw new Error();
        }
        const newAccessToken = (0, sign_jwt_utils_1.signJwtAccessToken)(res, { userId: user._id });
        const { refreshToken: newRefreshToken, refreshTokenId } = (0, sign_jwt_utils_1.signJwtRefreshToken)(res, user._id);
        user.refreshTokenId = refreshTokenId;
        yield user.save();
        return { newAccessToken, newRefreshToken };
    }
    catch (error) {
        return error;
    }
});
exports.reissueTokens = reissueTokens;
//# sourceMappingURL=reissue.jwt.utils.js.map