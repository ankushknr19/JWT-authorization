"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const lodash_1 = require("lodash");
const jwt_utils_1 = require("../utils/jwt.utils");
const verifyUser = (req, res, next) => {
    const cookies = (0, lodash_1.get)(req, 'headers.cookie');
    const accessToken = cookies === null || cookies === void 0 ? void 0 : cookies.split('=')[1];
    if (!accessToken) {
        res.status(401).send('unauathorized, invalid token');
        return next();
    }
    const { valid, decoded, expired } = (0, jwt_utils_1.verifyJwt)(accessToken);
    if (valid && !expired) {
        res.locals.user = decoded;
        return next();
    }
    if (expired) {
        res.status(401).send('access token expired');
        return next();
    }
    next();
};
exports.verifyUser = verifyUser;
//# sourceMappingURL=verifyTokens.js.map