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
exports.verifyUser = void 0;
const lodash_1 = require("lodash");
const verify_jwt_utils_1 = require("../utils/jwt_utils/verify.jwt.utils");
const reissue_jwt_utils_1 = require("../utils/jwt_utils/reissue.jwt.utils");
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookies = (0, lodash_1.get)(req, 'cookies');
        const accessToken = cookies.accessToken;
        const refreshToken = cookies.refreshToken;
        if (!accessToken)
            throw new Error('unauathorized, invalid token');
        const { valid, decoded, expired } = (0, verify_jwt_utils_1.verifyAccessToken)(accessToken);
        if (valid && decoded && !expired) {
            res.locals.user = decoded;
            return next();
        }
        if (expired && refreshToken) {
            const { newAccessToken } = yield (0, reissue_jwt_utils_1.reissueTokens)(res, refreshToken);
            if (!newAccessToken)
                throw new Error('reissue failed');
            const { valid, decoded, expired } = (0, verify_jwt_utils_1.verifyAccessToken)(newAccessToken);
            if (valid && decoded && !expired) {
                res.locals.user = decoded;
                return next();
            }
        }
        next();
    }
    catch (error) {
        res.status(401).send(error.message);
    }
});
exports.verifyUser = verifyUser;
//# sourceMappingURL=verifyUser.js.map