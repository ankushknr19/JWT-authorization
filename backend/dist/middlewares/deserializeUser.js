"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeUser = void 0;
const lodash_1 = require("lodash");
const jwt_utils_1 = require("../utils/jwt.utils");
const deserializeUser = (req, res, next) => {
    const cookies = (0, lodash_1.get)(req, 'headers.cookie');
    const accessToken = cookies === null || cookies === void 0 ? void 0 : cookies.split('=')[1];
    if (!accessToken) {
        return next();
    }
    const { valid, decoded, expired } = (0, jwt_utils_1.verifyJwt)(accessToken);
    if (valid && !expired) {
        res.locals.user = decoded;
        return next();
    }
    if (expired) {
        return next();
    }
    next();
};
exports.deserializeUser = deserializeUser;
//# sourceMappingURL=deserializeUser.js.map